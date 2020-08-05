// 기본 모듈
// fs : 파일 시스템을 다루기 위한 모듈

const fs = require("fs");

// 파일 열기
// 동기식
try { // 동기식은 try-catch로 에러 처리 가능
    const data = fs.readFileSync("hello.txt", "utf8");
    console.log(data);
} catch (exception) {
    console.error("동기식 Error : " + exception);
}
console.log("동기식 읽기 완료");
console.log();

// 비동기식
fs.readFile("hello.txt", "utf8", (err, data) => {
    if (err) {
        console.error("비동기식 Error : " + err);
    } else {
        console.log(data);
    }
});
console.log("비동기식 읽기 완료");