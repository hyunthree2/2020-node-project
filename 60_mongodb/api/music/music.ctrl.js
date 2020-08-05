const MusicModel = require("../../models/music.js");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }
  next();
};

// 목록 조회 (localhost:3000/api/music?limit=3)
// - 성공 : limit수만큼 music 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닌 경우 에러 (400: Bad Request)
const list = (req, res) => {
  const limit = parseInt(req.query.limit || 10, 10); // 안 보내면 디폴트 10. 뒤에 10은 10진수
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  // limit수만큼 music 객체를 담은 배열 리턴
  MusicModel.find((err, result) => {
    if (err) return res.status(500).end();
    // res.json(result);
    res.render("music/list", { result });
  })
    .limit(limit)
    .sort({ _id: -1 });
};

// 상세 조회 (music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const detail = (req, res) => {
  const id = req.params.id;
  // 1. findById()
  // MusicModel.findById(id, (err, result) => {
  //     if (err) throw err;
  //     if (!result) return res.status(404).end();
  //     res.json(result);
  // });

  // 2. findOne()
  MusicModel.findOne({ _id: id }, (err, result) => {
    if (err) return res.stats(500).end();
    if (!result) return res.stauts(404).end();
    // res.json(result);
    res.render("music/detail.ejs", { result });
  });
};

// 등록 (localhost:3000/api/music)
// - 성공 : id 채번(채번 : 새로운 번호를 받음), 등록한 music 객체를 리턴 (201: Created)
// - 실패 : singer, title 값 누락 시 400 반환 (400: Bad Request)
const create = (req, res) => {
  const { singer, title } = req.body;
  if (!singer || !title)
    return res.status(400).end("필수 항목이 입력되지 않았습니다.");

  // 1. model의 객체인 document 생성 후 save
  // const music = new MusicModel({ singer, title });
  // music.save((err, result) => {
  //     if (err) throw err;
  //     res.status(201).json(result);
  // });

  // 2. Model.create()
  MusicModel.create({ singer, title }, (err, result) => {
    if (err) return res.status(500).end("등록 시 오류가 발생했습니다.");
    res.status(201).json(result);
  });
};

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체를 입력데이터로
//          변경 후 해당 객체 반환 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없을 경우 (404: Not Found)
const update = (req, res) => {
  const id = req.params.id;
  const { singer, title } = req.body;

  MusicModel.findByIdAndUpdate(
    id,
    { singer, title },
    { new: true }, // new true 안 하면 수정은 되는데 결과 출력이 이전 데이터로 나옴
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴 (200: OK)
// - 실패 : 유효하지 않은 id인 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
  const id = req.params.id;

  // 삭제 처리
  MusicModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

const showCreatePage = (req, res) => {
  res.render("music/create");
};
const showUpdatePage = (req, res) => {
  const id = req.params.id;
  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 결과가 없습니다.");
    res.render("music/update", { result });
  });
};

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
  checkId,
  showCreatePage,
  showUpdatePage,
};
