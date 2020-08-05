// 프레임워크 = 정해진 틀(차체)
// 라이브러리 = 틀 안에 들어있는 것들(차의 엔진)

const express = require('express')
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express()
const port = 3000

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

// form에 전달되는 바디메시지 처리하는 바디파서 모듈 설정
// true : qs(확장모듈), false : querystring(기본모듈)
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// 정적 파일(css, jpg, html, ...) 위치 설정
// 127.0.0.1:3000/music.html
app.use(express.static("public"));
// 127.0.0.1:3000/static/music.html
// app.use("/static", express.static("public"));

// 로깅처리(/ 위에서만 하면 됨)
app.use(logger("dev")); // dev, short, common, combined

// 라우팅 모듈 설정(localhost:3000/api/music)
app.use("/api", require("./api")); // api/index.js -> api.js 없어서 index 찾음, index는 생략 가능

// 라우팅 모듈 설정
// app.use("/music", require("./api/music"));

// app.use("/movie", require("./api/movie"));

// 여기까지 내려왔으면 위에서 처리가 안 된 것
app.use((req, res, next) => {
    const error = new Error("없는 페이지입니다.");
    error.code = 404;
    next(error);
});

// 오류처리 미들웨어 함수
app.use((err, req, res, next) => {
    // if (err.code) res.status(err.code);
    // else res.status(500); // 500 : Internal Server Error
    res.status(err.code || 500);
    // if (err.message) res.send(err.message);
    // else res.send("Internal Server Error입니다");
    res.send(err.message || "Internal Server Error입니다");
});