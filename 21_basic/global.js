console.time('time');
console.log("Hello, Node.js");
global.console.log("Hello, Node.js");
console.timeEnd('time');

// console.log(process.argv)
// console.log(process.env)
// console.log(process.version)
// console.log(process.versions)
// console.log(process.arch)
// console.log(process.platform)
console.log(process.memoryUsage()); // 메모리 사용정보
console.log(process.uptime());      // 프로그램 실행 시간