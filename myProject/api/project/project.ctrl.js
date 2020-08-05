const ProjectModel = require("../../models/project");
const UserModel = require("../../models/user");
const mongoose = require("mongoose");

const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

const update = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  UserModel.findByIdAndUpdate(
    id,
    { name },
    { new: true }, // new true 안 하면 수정은 되는데 결과 출력이 이전 데이터로 나옴
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;
  UserModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 결과가 없습니다.");
    res.render("updatepro", result);
  });
};

const list = (req, res) => {
  const data = res.render("list", {});
};

const profile = (req, res) => {
  res.render("profile");
};

const main = (req, res) => {
  res.render("main");
};

const create = (req, res) => {
  const { emotion, diary, date } = req.body;
  const userid = res.locals.user.id;

  ProjectModel.create({ emotion, diary, date, userid }, (err, result) => {
    if (err) return res.status(500).end("등록 시 오류가 발생했습니다.");
    res.status(201).json(result);
  });
};

const detail = (req, res) => {
  const day = req.params.day;
  const userid = res.locals.user.id;
  ProjectModel.find({ day, userid }, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("detail", { result });
  }).sort({ date: -1 });
};

const stat = (req, res) => {
  const userid = res.locals.user.id;
  ProjectModel.find({ userid }, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("stat", { result });
  });
};

const remove = (req, res) => {
  const id = req.params.id;
  ProjectModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    // if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    if (!result) return res.render("error2");
    res.render("delete");
  });
};

const detailofdetail = (req, res) => {
  const id = req.params.id;
  ProjectModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.render("detailofdetail", { result });
  });
};

module.exports = {
  detailofdetail,
  list,
  stat,
  profile,
  create,
  detail,
  checkId,
  update,
  showUpdatePage,
  main,
  remove,
};
