const express = require("express");
const router = express.Router();
const ctrl = require("./music.ctrl");

// 라우팅 설정
router.get("/", ctrl.list);
router.get("/:id", ctrl.detail);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;