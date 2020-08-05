// 기본 모듈
// url : URL 처리하는 모듈
const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // string -> object
  // 127.0.0.1:3000/xxx
  const obj = url.parse(req.url, true); // /xxx
  const year = obj.query.year;
  const cls = obj.query.class;
  const name = obj.query.name;
  
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(`${year}학년 ${cls}반 ${name}입니다. ㅎㅎ`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});