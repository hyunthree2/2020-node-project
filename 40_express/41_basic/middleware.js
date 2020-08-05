// 미들웨어 (middleware)
// express 어플리케이션 : 뼈대
// 어플리케이션에 필요한 기능을 미들웨어로 추가

const express = require('express');
const moment = require("moment");
const app = express();
const port = 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

const mw1 = (req, res, next) => {
    console.log("첫 번째 미들웨어");
    next(); // 다음 미들웨어 호출
}

const mw2 = (req, res, next) => {
    console.log("두 번째 미들웨어");
    next();
}

// 미들웨어 설정 시 순서 중요(mw2를 먼저 실행되게 하고 싶으면 app.use(mw2) 먼저 쓰기)
// 1. 애플리케이션 레벨 미들웨어
app.use(mw2);
app.use(mw1);

// 로깅 처리하는 미들웨어 함수 정의
const logger = (req, res, next) => {
    // 비구조화 활당(destructuring)
    const { method, url } = req; // req.method, req.url // req = {method:xx, url:xx}
    // const method = req.method;
    const time = moment().format("YYYY-MM-DD HH:mm:ss:SSS")
    console.log(`${method} - ${url} - ${time}`);
    next();
}

app.get("/", (req, res) => {
    res.send("Hello, World");
})

app.use(logger);

app.get("/hello", (req, res) => {
    res.send("안녕하시와요");
})

// 2. 라우터 레벨 미들웨어

// 3. 기본 제공 미들웨어
app.use(express.static("public"));

// 4. 서드 파티 미들웨어
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// 5. 오류 처리 미들웨어 (코드 마지막에)
app.use((req, res) => {
    //
});