import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PDFOperationRequest {
  operation: 'merge' | 'split' | 'compress' | 'rotate' | 'extract_text' | 'add_watermark';
  files?: string[]; // base64 encoded PDFs
  options?: {
    pages?: string; // for split operation e.g., "1-3,5,7-9"
    quality?: 'low' | 'medium' | 'high'; // for compress
    rotation?: 90 | 180 | 270; // for rotate
    watermarkText?: string; // for watermark
    pageNumbers?: number[]; // specific pages
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get authenticated user
    let user = null;
    try {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && !authHeader.includes("anon")) {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
      }
    } catch (error) {
      console.log("Processing without authentication:", error.message);
    }

    const { operation, files, options }: PDFOperationRequest = await req.json();

    // Validate operation
    const validOperations = ['merge', 'split', 'compress', 'rotate', 'extract_text', 'add_watermark'];
    if (!operation || !validOperations.includes(operation)) {
      return new Response(
        JSON.stringify({ error: 'Invalid operation type' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Starting PDF operation: ${operation}, User: ${user?.id || 'anonymous'}`);

    // Track job in database
    let jobId = null;
    if (user) {
      const { data: job } = await supabaseClient
        .from("conversion_jobs")
        .insert({
          user_id: user.id,
          conversion_type: `pdf_${operation}`,
          status: "processing",
          input_data: { operation, options },
        })
        .select()
        .maybeSingle();
      
      jobId = job?.id;
    }

    const startTime = Date.now();
    let result: any = {};

    try {
      // If a dedicated pdf-worker URL is configured, forward heavy operations
      const pdfWorkerUrl = Deno.env.get("PDF_WORKER_URL") ?? "";

      // Helper: convert base64 string -> Uint8Array
      const base64ToUint8Array = (b64: string) => {
        const binary = atob(b64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
        return bytes;
      };

      // Only forward to the worker if URL is provided and operation is supported
      if (pdfWorkerUrl && (operation === 'merge' || operation === 'compress')) {
        try {
          const url = new URL(pdfWorkerUrl);

          // Build FormData for the worker
          const form = new FormData();

          if (operation === 'merge') {
            if (!files || files.length < 2) {
              return new Response(JSON.stringify({ error: 'Need at least 2 files for merge' }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }

            files.forEach((f, idx) => {
              const bytes = base64ToUint8Array(f);
              const blob = new Blob([bytes], { type: 'application/pdf' });
              // append as `files` to match the pdf-worker implementation
              form.append('files', blob, `file-${idx + 1}.pdf`);
            });

            const workerRes = await fetch(url.href.replace(/\/$/, '') + '/merge', {
              method: 'POST',
              body: form,
            });

            if (!workerRes.ok) throw new Error(`pdf-worker merge failed: ${workerRes.status}`);

            const arrayBuffer = await workerRes.arrayBuffer();
            const outBytes = new Uint8Array(arrayBuffer);
            let binary = '';
            for (let i = 0; i < outBytes.byteLength; i++) binary += String.fromCharCode(outBytes[i]);
            const b64 = btoa(binary);

            result = { message: 'merged', output_base64: b64, mime: 'application/pdf' };
          } else if (operation === 'compress') {
            if (!files || files.length === 0) {
              return new Response(JSON.stringify({ error: 'No file provided for compress' }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              });
            }

            // Use the first file for compression
            const bytes = base64ToUint8Array(files[0]);
            const blob = new Blob([bytes], { type: 'application/pdf' });
            form.append('file', blob, `input.pdf`);

            const workerRes = await fetch(url.href.replace(/\/$/, '') + '/compress', {
              method: 'POST',
              body: form,
            });

            if (!workerRes.ok) throw new Error(`pdf-worker compress failed: ${workerRes.status}`);

            const arrayBuffer = await workerRes.arrayBuffer();
            const outBytes = new Uint8Array(arrayBuffer);
            let binary = '';
            for (let i = 0; i < outBytes.byteLength; i++) binary += String.fromCharCode(outBytes[i]);
            const b64 = btoa(binary);

            result = { message: 'compressed', output_base64: b64, mime: 'application/pdf' };
          }

        } catch (workerError: any) {
          console.error('pdf-worker error:', workerError?.message || workerError);
          // Fallback to client-side handling message
          result = {
            message: "Failed to process via pdf-worker; see details",
            details: workerError?.message || String(workerError),
            operation,
          };
        }
      } else {
        // No worker configured or unsupported operation: keep original placeholder
        result = {
          message: "PDF operations are currently processed on the client side",
          operation,
          recommendation: "Use the frontend PDFTools component for PDF operations or set PDF_WORKER_URL to enable server-side processing",
          note: "For server-side PDF processing, use the separate pdf-worker service that bundles LibreOffice/ghostscript/qpdf",
        };
      }

      const processingTime = Date.now() - startTime;

      if (user && jobId) {
        await supabaseClient
          .from("conversion_jobs")
          .update({
            status: "completed",
            output_data: result,
            processing_time_ms: processingTime,
            completed_at: new Date().toISOString(),
          })
          .eq("id", jobId);
      }

      console.log(`PDF operation completed in ${processingTime}ms`);

      return new Response(
        JSON.stringify({
          success: true,
          job_id: jobId,
          result,
          processing_time_ms: processingTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );

    } catch (operationError: any) {
      console.error("PDF operation error:", operationError);
      
      if (user && jobId) {
        await supabaseClient
          .from("conversion_jobs")
          .update({
            status: "failed",
            error_message: operationError.message,
          })
          .eq("id", jobId);
      }

      return new Response(
        JSON.stringify({ 
          success: false,
          error: "PDF operation failed", 
          details: operationError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error: any) {
    console.error("General error:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
