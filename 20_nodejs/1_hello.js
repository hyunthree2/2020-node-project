// 1. REPL

// 2. 콘솔 출력
console.log("Hello, World");

// 3. 웹서버를 띄워 출력
const http = require('http'); // 모듈 가져오기

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/') {
  res.statusCode = 200; // 200은 정상 응답(OK~), 404는 not found, 500은 인터널 서버 에러
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
  } else if (req.url === '/html') {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<body><h1>Hello, world</h1></body>");
    res.write("</html>");
    res.end();
  } else if (req.url === '/json') {
    const data = { msg: 'hello, world' };
    res.statusCode = 200; // 200은 정상 응답(OK~), 404는 not found, 500은 인터널 서버 에러
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } else {
    // 그 외의 url인 경우 404 not found
    // Not found (plain, html, json)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("404 Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});