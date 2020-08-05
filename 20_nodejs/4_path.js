// 기본 모듈 vs 확장 모듈
// path : 파일/URL 경로를 다루는 모듈

const path = require("path");

console.log(__dirname);
console.log(__filename);

// string(입력) -> object(출력)
const obj = path.parse(__filename);
console.log(obj);
