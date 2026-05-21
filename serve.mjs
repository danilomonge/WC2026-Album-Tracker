// Minimal static file server — used by .claude/launch.json for the preview panel.
import http from "http";
import fs from "fs";
import path from "path";

const ROOT = "/Users/danilomonge/Desktop/Own Projects/Panini Álbum/Panini-Sticker-Checklist";
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
  let filePath = path.join(ROOT, req.url === "/" ? "/index.html" : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Panini server running on http://localhost:${PORT}`);
});
