const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/login", ctrl.showLoginPage);
router.post("/login", ctrl.login);

router.get("/signup", ctrl.showSignupPage);
router.post("/signup", ctrl.signup);

router.get("/logout", ctrl.logout);

module.exports = router;
