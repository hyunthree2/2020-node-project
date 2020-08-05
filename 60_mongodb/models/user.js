const mongoose = require("mongoose");

// 스키마 정의
// 컬렉션에 들어가는 Document의 구조를 정의
// 필드, 타입, 필수여부 등

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },

  role: {
    type: Number,
    default: 0, // 0: 일반 사용자 1: 관리자
  },

  token: {
    type: String,
  },
});

// 스키마(구조) -> 모델
// 컬렉션 -> musics(모델명에 s 붙이면 컬렉션 됨. 싫으면 MusicSchema 뒤에 콤마 찍고 쓰면 됨)
const User = mongoose.model("user", UserSchema);
module.exports = User;
