const UserModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const showSignupPage = (req, res) => {
  res.render("user/signup");
};

const showLoginPage = (req, res) => {
  res.render("user/login");
};

// 성공 -> 201 응답
// 실패 -> 필수 입력값 누락(400), email 중복(409)
const signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send("필수 값이 입력되지 않았습니다.");
  UserModel.findOne({ email }, (err, result) => {
    if (err) return res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
    if (result) return res.status(409).send("이미 사용 중인 E-mail입니다.");
    // 사용자 정보 등록
    // 단방향 암호화 : 해시
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).send("암호화 시 오류가 발생했습니다.");
      const user = new UserModel({ name, email, password: hash });
      user.save((err, result) => {
        if (err)
          return res.status(500).send("사용자 등록 시 오류가 발생했습니다.");
        res.status(201).json(result);
      });
    });
  });
};

// 로그인
// - 성공 : email, pw 일치 -> 200(OK) 리턴
// - 실패 : email, pw 미입력 시 -> 400 리턴
//          없는 email -> 404 리턴
//          pw 일치하지 않는 경우 -> 500 리턴

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  UserModel.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
    if (!user) return res.status(404).send("가입되지 않은 계정입니다.");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send("로그인 시 오류가 발생했습니다.");
      if (!isMatch)
        return res.status(500).send("비밀번호가 올바르지 않습니다.");

      // 비밀번호까지 맞다면 token 발급(jsonwebtoken)
      const token = jwt.sign(user._id.toHexString(), "secretKey");
      UserModel.findByIdAndUpdate(user._id, { token }, (err, result) => {
        if (err) return res.status(500).send("로그인 시 에러가 발생했습니다.");
        res.cookie("token", token, { httpOnly: true });
        res.json(result);
      });
    });
  });
};

const checkAuth = (req, res, next) => {
  // 공통적으로 사용되는 data
  res.locals.user = null;

  // 쿠키에서 토큰을 가져옴
  const token = req.cookies.token;

  if (!token) {
    // 정상적으로 토큰이 없는 경우
    if (
      req.url === "/" ||
      req.url === "/api/user/signup" ||
      req.url === "/api/user/login"
    )
      return next();
    // 비정상적인 경우
    else return res.render("user/login");
  }

  // token값을 verify
  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) {
      res.clearCookie("token");
      return res.render("user/login");
    }

    UserModel.findOne({ _id, token }, (err, user) => {
      if (err) return res.status(500).send("인증 시 오류가 발생했습니다.");
      if (!user) return res.render("user/login");
      res.locals.user = { name: user.name, role: user.role };
      next();
    });
  });
};

const logout = (req, res) => {
  const token = req.cookies.token;

  jwt.verify(token, "secretKey", (err, _id) => {
    if (err) return res.status(500).send("로그아웃시 오류가 발생했습니다");
    UserModel.findByIdAndUpdate(_id, { token: "" }, (err, result) => {
      if (err) return res.status(500).send("로그아웃 시 오류가 발생했습니다");
      res.clearCookie("token");
      res.redirect("/");
    });
  });
};

module.exports = {
  logout,
  showSignupPage,
  signup,
  showLoginPage,
  login,
  checkAuth,
};
