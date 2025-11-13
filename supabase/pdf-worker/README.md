conform pdf-worker

This service runs LibreOffice, Ghostscript and qpdf to handle heavy PDF operations that are not suitable for a browser-only implementation.

How it works

- Built as a Docker container with LibreOffice and common PDF utilities installed.
- Exposes simple endpoints:
  - POST /convert-to-pdf (multipart form field `file`) — convert office files (docx, odt, pptx) to PDF via `soffice`.
  - POST /compress (multipart form field `file`) — compress PDF using `gs` (Ghostscript).
  - POST /merge (multipart form field `files`) — merge multiple PDFs using `qpdf`.

Build locally

```powershell
# from repository root
cd supabase/pdf-worker
npm ci
npm run build
docker build -t conform-pdf-worker .

# run container
docker run --rm -p 3000:3000 conform-pdf-worker
```

Usage (curl examples)

Convert file to PDF:

```bash
curl -X POST -F "file=@example.docx" http://localhost:3000/convert-to-pdf --output example.pdf
```

Compress PDF:

```bash
curl -X POST -F "file=@example.pdf" http://localhost:3000/compress --output example-compressed.pdf
```

Merge PDFs:

```bash
curl -X POST -F "files=@a.pdf" -F "files=@b.pdf" http://localhost:3000/merge --output merged.pdf
```

Deployment

- Deploy this container to any container host (Cloud Run, Render, DigitalOcean, Fly.io, etc.).
- For integration with your frontend or Supabase Edge functions, call this service via HTTP and optionally store the converted PDFs in Supabase Storage.

Notes

- Supabase Edge Functions (Deno) cannot install system packages like LibreOffice, so a separate containerized service is required for this functionality.
- Consider a background job queue if conversions are long-running; do not block HTTP request for very large files.
