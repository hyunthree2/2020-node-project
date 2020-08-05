const express = require("express");
const router = express.Router();
const ctrl = require("./project.ctrl");

// 라우팅 설정

router.get("/list", ctrl.list);
router.get("/stat", ctrl.stat);
router.get("/:id/edit", ctrl.checkId, ctrl.showUpdatePage);
router.get("/detail/:id", ctrl.checkId, ctrl.detailofdetail);
router.get("/profile", ctrl.profile);
router.get("/:day", ctrl.detail);
router.put("/:id", ctrl.checkId, ctrl.update);
router.post("/", ctrl.create);
router.get("/main", ctrl.main);
router.get("/delete/:id", ctrl.checkId, ctrl.remove);
module.exports = router;
