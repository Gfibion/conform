import express from "express";
import multer from "multer";
import { execFile } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const upload = multer({ storage: multer.memoryStorage() });
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Simple health
app.get("/", (_req, res) => res.json({ ok: true, service: "conform-pdf-worker" }));

// Convert input file (docx, odt, pptx, etc.) to PDF using LibreOffice
app.post("/convert-to-pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const tmpId = uuidv4();
    const tmpDir = path.join("/tmp", tmpId);
    await fs.mkdir(tmpDir, { recursive: true });

    const inputPath = path.join(tmpDir, req.file.originalname);
    await fs.writeFile(inputPath, req.file.buffer);

    // LibreOffice converts and writes output in the same directory
    await runCommand("soffice", ["--headless", "--convert-to", "pdf", "--outdir", tmpDir, inputPath]);

    // Find the output file (replace extension with .pdf)
    const outName = path.basename(req.file.originalname).replace(/\.[^/.]+$/, ".pdf");
    const outPath = path.join(tmpDir, outName);

    const pdfBuffer = await fs.readFile(outPath);

    // cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${outName}\"`);
    res.send(pdfBuffer);
  } catch (err: any) {
    console.error("convert-to-pdf error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

// Compress PDF using Ghostscript
app.post("/compress", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const tmpId = uuidv4();
    const tmpDir = path.join("/tmp", tmpId);
    await fs.mkdir(tmpDir, { recursive: true });

    const inputPath = path.join(tmpDir, req.file.originalname);
    await fs.writeFile(inputPath, req.file.buffer);

    const outPath = path.join(tmpDir, `compressed-${req.file.originalname}`);

    // Ghostscript PDF compression
    // -dPDFSETTINGS=/screen (low), /ebook (medium), /printer (high), /prepress (highest)
    await runCommand("gs", [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      "-dPDFSETTINGS=/ebook",
      `-sOutputFile=${outPath}`,
      inputPath,
    ]);

    const pdfBuffer = await fs.readFile(outPath);

    // cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${path.basename(outPath)}\"`);
    res.send(pdfBuffer);
  } catch (err: any) {
    console.error("compress error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

// Merge PDFs using qpdf
app.post("/merge", upload.array("files"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length < 2) return res.status(400).json({ error: "Need at least 2 PDF files to merge" });

    const tmpId = uuidv4();
    const tmpDir = path.join("/tmp", tmpId);
    await fs.mkdir(tmpDir, { recursive: true });

    const inputPaths: string[] = [];
    for (const f of files) {
      const p = path.join(tmpDir, f.originalname);
      await fs.writeFile(p, f.buffer);
      inputPaths.push(p);
    }

    const outPath = path.join(tmpDir, `merged-${tmpId}.pdf`);

    await runCommand("qpdf", ["--empty", "--pages", ...inputPaths, "--", outPath]);

    const pdfBuffer = await fs.readFile(outPath);

    // cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"merged.pdf\"`);
    res.send(pdfBuffer);
  } catch (err: any) {
    console.error("merge error:", err);
    res.status(500).json({ error: err?.message || String(err) });
  }
});

// Utility to run a command
function runCommand(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = execFile(cmd, args, (error, _stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${cmd} ${args.join(" ")}`);
        console.error(stderr);
        return reject(error);
      }
      resolve();
    });
  });
}

app.listen(PORT, () => {
  console.log(`conform-pdf-worker listening on ${PORT}`);
});
