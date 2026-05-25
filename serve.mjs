// Minimal static file server — used by .claude/launch.json for the preview panel.
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Calcular la raíz del proyecto de forma dinámica y robusta
const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(__filename);
const PORT = process.env.PORT || 5500;

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".ico":  "image/x-icon",
  ".svg":  "image/svg+xml",
  ".woff2":"font/woff2",
};

http.createServer((req, res) => {
  // 1. Limpiar query params y hash del request URL
  let requestPath = req.url;
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    requestPath = parsedUrl.pathname;
  } catch {
    // Si falla el parseo, dejamos el fallback
  }

  // 2. Mapear index.html para la raíz
  const targetFile = requestPath === "/" ? "/index.html" : requestPath;

  // 3. Resolver la ruta absoluta de forma segura
  const filePath = path.join(ROOT, targetFile);
  const safePath = path.resolve(filePath);

  // 4. Defensa contra Path Traversal: verificar que la ruta final esté dentro de la raíz.
  // Issue #14: `startsWith(ROOT)` has a boundary bug — a sibling directory named
  // ROOT + "extra" would pass the check. Use ROOT + path.sep as the prefix so the
  // check requires an actual directory boundary after the root segment.
  const safeRoot = ROOT.endsWith(path.sep) ? ROOT : ROOT + path.sep;
  if (safePath !== ROOT && !safePath.startsWith(safeRoot)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  // 5. Leer y servir el archivo
  fs.readFile(safePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(safePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Panini server running on http://localhost:${PORT}`);
});
