// console.log("Hello");

// var server = require('http');

// server.createServer(function(req, res){
//   res.writeHead(200, { 'Content-Type' : 'text/plain' });
//   res.end("Hello, Node.js");
// }).listen(3000, 'localhost');

// console.log('Server is running at http://localhost:3000/');

// var server = require('http');

// server.createServer(function(req, res){
//   res.writeHead(200, { 'Content-Type' : 'text/html' });
//   res.write("<!DOCTYPE html>");
//   res.write("<html>");
//   res.write("  <head><title>Node.js</title></head>");
//   res.write("  <body><h1>Hello, Node.js</h1></body>");
//   res.write("</html>");
//   res.end();
// }).listen(3000, 'localhost');

// console.log('Server is running at http://localhost:3000/');

// var fs = require("fs");

// fs.readFile('./hello.txt', encoding='utf-8', function(err, data) {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log(data);
// });

var EventEmitter = require("events").EventEmitter;
var evt = new EventEmitter();   // 이벤트 객체 생성

evt.on("helloNode", function(str) {
  console.log(str);
});

setTimeout(function() {
  evt.emit("helloNode", "Hello, Node.js");
}, 3000);       // 3초 있다가 이벤트 발생