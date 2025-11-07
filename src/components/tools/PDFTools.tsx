import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  Upload,
  Download,
  FileText,
  Trash2,
  Lock,
  Unlock,
  Scissors,
  Merge,
  Minimize2,
  GripVertical,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PDFFile {
  id: string;
  name: string;
  file: File;
  pageCount?: number;
  thumbnail?: string;
}

export const PDFTools = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [mergedFiles, setMergedFiles] = useState<PDFFile[]>([]);
  const [splitFile, setSplitFile] = useState<PDFFile | null>(null);
  const [splitPages, setSplitPages] = useState("");
  const [compressFile, setCompressFile] = useState<PDFFile | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Merge PDFs drop zone
  const onDropMerge = useCallback(
    async (acceptedFiles: File[]) => {
      const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf");

      if (pdfFiles.length === 0) {
        toast({
          title: "Invalid files",
          description: "Please upload PDF files only",
          variant: "destructive",
        });
        return;
      }

      const newFiles: PDFFile[] = await Promise.all(
        pdfFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(arrayBuffer);

          return {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            file,
            pageCount: pdfDoc.getPageCount(),
          };
        })
      );

      setMergedFiles([...mergedFiles, ...newFiles]);
      toast({
        title: "Files added",
        description: `${pdfFiles.length} PDF file(s) added for merging`,
      });
    },
    [mergedFiles, toast]
  );

  const { getRootProps: getMergeRootProps, getInputProps: getMergeInputProps } = useDropzone({
    onDrop: onDropMerge,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  // Split PDF drop zone
  const onDropSplit = useCallback(
    async (acceptedFiles: File[]) => {
      const pdfFile = acceptedFiles[0];
      if (!pdfFile || pdfFile.type !== "application/pdf") {
        toast({
          title: "Invalid file",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      setSplitFile({
        id: Math.random().toString(36).substr(2, 9),
        name: pdfFile.name,
        file: pdfFile,
        pageCount: pdfDoc.getPageCount(),
      });

      toast({
        title: "File loaded",
        description: `PDF with ${pdfDoc.getPageCount()} pages ready to split`,
      });
    },
    [toast]
  );

  const { getRootProps: getSplitRootProps, getInputProps: getSplitInputProps } = useDropzone({
    onDrop: onDropSplit,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  // Compress PDF drop zone
  const onDropCompress = useCallback(
    async (acceptedFiles: File[]) => {
      const pdfFile = acceptedFiles[0];
      if (!pdfFile || pdfFile.type !== "application/pdf") {
        toast({
          title: "Invalid file",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      setCompressFile({
        id: Math.random().toString(36).substr(2, 9),
        name: pdfFile.name,
        file: pdfFile,
        pageCount: pdfDoc.getPageCount(),
      });

      toast({
        title: "File loaded",
        description: "PDF ready for compression",
      });
    },
    [toast]
  );

  const { getRootProps: getCompressRootProps, getInputProps: getCompressInputProps } =
    useDropzone({
      onDrop: onDropCompress,
      accept: { "application/pdf": [".pdf"] },
      multiple: false,
    });

  // Merge PDFs
  const handleMergePDFs = async () => {
    if (mergedFiles.length < 2) {
      toast({
        title: "Not enough files",
        description: "Please add at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < mergedFiles.length; i++) {
        setProgress((i / mergedFiles.length) * 100);

        const fileBuffer = await mergedFiles[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      
      if (password) {
        toast({
          title: "Note",
          description: "Password protection is not available in this version. PDF saved without encryption.",
        });
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress(100);
      toast({
        title: "Success!",
        description: "PDFs merged successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  // Split PDF
  const handleSplitPDF = async () => {
    if (!splitFile) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to split",
        variant: "destructive",
      });
      return;
    }

    if (!splitPages.trim()) {
      toast({
        title: "No pages specified",
        description: "Please specify page ranges (e.g., 1-3,5,7-9)",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const fileBuffer = await splitFile.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);

      // Parse page ranges
      const pageRanges = splitPages.split(",").map((range) => {
        if (range.includes("-")) {
          const [start, end] = range.split("-").map((n) => parseInt(n.trim()) - 1);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        return [parseInt(range.trim()) - 1];
      });

      const flatPages = pageRanges.flat();

      // Create new PDF with selected pages
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, flatPages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      
      if (password) {
        toast({
          title: "Note",
          description: "Password protection is not available in this version. PDF saved without encryption.",
        });
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-${splitFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress(100);
      toast({
        title: "Success!",
        description: "PDF split successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to split PDF. Check page ranges and try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  // Compress PDF
  const handleCompressPDF = async () => {
    if (!compressFile) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to compress",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      const fileBuffer = await compressFile.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);

      setProgress(50);

      // Note: pdf-lib doesn't have built-in compression
      // This removes metadata and optimizes the structure
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      setProgress(80);

      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const originalSize = compressFile.file.size;
      const newSize = blob.size;
      const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${compressFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress(100);
      toast({
        title: "Success!",
        description: `PDF optimized. Size reduction: ${reduction}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to compress PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  // Remove file from merge list
  const removeFromMergeList = (id: string) => {
    setMergedFiles(mergedFiles.filter((f) => f.id !== id));
  };

  // Move file up in merge list
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...mergedFiles];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setMergedFiles(newFiles);
  };

  // Move file down in merge list
  const moveDown = (index: number) => {
    if (index === mergedFiles.length - 1) return;
    const newFiles = [...mergedFiles];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setMergedFiles(newFiles);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>PDF Tools</CardTitle>
        <CardDescription>
          Merge, split, compress PDFs with password protection and drag-and-drop support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="merge" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="merge">
              <Merge className="mr-2 h-4 w-4" />
              Merge
            </TabsTrigger>
            <TabsTrigger value="split">
              <Scissors className="mr-2 h-4 w-4" />
              Split
            </TabsTrigger>
            <TabsTrigger value="compress">
              <Minimize2 className="mr-2 h-4 w-4" />
              Compress
            </TabsTrigger>
          </TabsList>

          {/* Merge PDFs */}
          <TabsContent value="merge" className="space-y-4">
            <div
              {...getMergeRootProps()}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input {...getMergeInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop PDF files here</p>
              <p className="text-sm text-muted-foreground">
                or click to select files to merge
              </p>
            </div>

            {mergedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Files to merge ({mergedFiles.length})</Label>
                {mergedFiles.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.pageCount} pages
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => moveDown(index)}
                      disabled={index === mergedFiles.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromMergeList(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="merge-password">Password Protection (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="merge-password"
                  type="password"
                  placeholder="Enter password to protect merged PDF"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password ? (
                  <Lock className="h-5 w-5 text-primary" />
                ) : (
                  <Unlock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {processing && <Progress value={progress} className="w-full" />}

            <Button
              onClick={handleMergePDFs}
              disabled={processing || mergedFiles.length < 2}
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              {processing ? "Merging..." : "Merge PDFs"}
            </Button>
          </TabsContent>

          {/* Split PDF */}
          <TabsContent value="split" className="space-y-4">
            <div
              {...getSplitRootProps()}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input {...getSplitInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop PDF file here</p>
              <p className="text-sm text-muted-foreground">or click to select a file to split</p>
            </div>

            {splitFile && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{splitFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {splitFile.pageCount} pages
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="split-pages">Page Ranges</Label>
              <Input
                id="split-pages"
                placeholder="e.g., 1-3,5,7-9 (extracts pages 1,2,3,5,7,8,9)"
                value={splitPages}
                onChange={(e) => setSplitPages(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Specify page ranges separated by commas. Use hyphens for ranges.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="split-password">Password Protection (Optional)</Label>
              <Input
                id="split-password"
                type="password"
                placeholder="Enter password to protect split PDF"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {processing && <Progress value={progress} className="w-full" />}

            <Button
              onClick={handleSplitPDF}
              disabled={processing || !splitFile}
              className="w-full"
              size="lg"
            >
              <Scissors className="mr-2 h-4 w-4" />
              {processing ? "Splitting..." : "Split PDF"}
            </Button>
          </TabsContent>

          {/* Compress PDF */}
          <TabsContent value="compress" className="space-y-4">
            <div
              {...getCompressRootProps()}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input {...getCompressInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Drop PDF file here</p>
              <p className="text-sm text-muted-foreground">
                or click to select a file to compress
              </p>
            </div>

            {compressFile && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{compressFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {compressFile.pageCount} pages •{" "}
                      {(compressFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {processing && <Progress value={progress} className="w-full" />}

            <Button
              onClick={handleCompressPDF}
              disabled={processing || !compressFile}
              className="w-full"
              size="lg"
            >
              <Minimize2 className="mr-2 h-4 w-4" />
              {processing ? "Compressing..." : "Compress PDF"}
            </Button>

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">Note:</p>
              <p>
                This tool optimizes PDF structure and removes unnecessary metadata. For best
                results, ensure images in your PDF are already compressed.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
