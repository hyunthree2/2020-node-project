// 기본 모듈 종합 실습
// 127.0.0.1:3000/dog.jpg
// http, path, fs

const http = require('http');
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const obj = path.parse(req.url);
  console.log(obj);

  const imageFile = "images" + path.sep + obj.base;

  fs.readFile(imageFile, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }
    res.statusCode = 200;
    // text/plain, text/html, application/json, image/jpeg
    res.setHeader("Content-Type", "image/jpeg");
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});