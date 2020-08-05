const express = require("express");
const router = express.Router();

router.use("/music", require("./music")); // music.js 없으니까 디렉토리인 걸 알고 index.js를 찾음
router.use("/movie", require("./movie"));
router.use("/user", require("./user"));

module.exports = router;
