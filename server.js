const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;
const ROOT = __dirname;
const mime = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript" };

const server = http.createServer((req, res) => {
  const filePath = path.join(ROOT, req.url === "/" ? "index.html" : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || "text/plain";
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("404 Not Found"); return; }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}/`));
