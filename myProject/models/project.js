const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등
let aa = new Date();
var year = aa.getFullYear();
var month = aa.getMonth() + 1;
var day = aa.getDate();

const ProjectSchema = new mongoose.Schema({
  emotion: {
    type: String,
  },
  diary: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  day: {
    type: String,
    default: String(year) + String(month) + String(day),
  },
  userid: {
    type: String,
    trim: true,
    required: true,
  },
});

// 스키마(구조) -> 모델
// 컬렉션 -> musics(모델명에 s 붙이면 컬렉션 됨. 싫으면 MusicSchema 뒤에 콤마 찍고 쓰면 됨)
const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
