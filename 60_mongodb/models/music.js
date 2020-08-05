const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const MusicSchema = new mongoose.Schema({
  singer: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// 스키마(구조) -> 모델
// 컬렉션 -> musics(모델명에 s 붙이면 컬렉션 됨. 싫으면 MusicSchema 뒤에 콤마 찍고 쓰면 됨)
const Music = mongoose.model("music", MusicSchema);
module.exports = Music;
