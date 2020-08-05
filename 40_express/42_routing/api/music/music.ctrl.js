// 데이터
let nextId = 4;
let music = [
    { id: 1, singer: "DAY6", title: "zombie" },
    { id: 2, singer: "오마이걸", title: "dolphin" },
    { id: 3, singer: "김원필", title: "마흘바" },
];

// 목록 조회 (localhost:3000/api/music?limit=3)
// - 성공 : limit수만큼 music 객체를 담은 배열을 리턴 (200: OK)
// - 실패 : limit가 숫자형이 아닌 경우 에러 (400: Bad Request)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);// 안 보내면 디폴트 10. 뒤에 10은 10진수
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    // limit수만큼 music 객체를 담은 배열 리턴
    res.json(music.slice(0, limit));
    // console.log(typeof limit);
    // res.send("list");
};

// 상세 조회 (music/:id)
// - 성공 : id에 해당하는 music 객체 리턴 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    // const result = music.find((m) => m.id === id);
    const result = music.filter((m) => m.id === id)[0]; // 필터는 array로 리턴
        if (!result) return res.status(404).end();
    res.json(result);
};

// 등록 (localhost:3000/api/music)
// - 성공 : id 채번(채번 : 새로운 번호를 받음), 등록한 music 객체를 리턴 (201: Created)
// - 실패 : singer, title 값 누락 시 400 반환 (400: Bad Request)
const create = (req, res) => {
    const { singer, title } = req.body;
    if (!singer || !title) return res.status(400).end();
    const m = { id: nextId++, singer, title }; // singer:singer 똑같아서 생략 가능
    music.push(m);
    res.status(201).json(m);
}; // 이거 insomnia에서 post로 바꾸고 화살표 눌러서 JSON으로 입력.
// 서버 재기동 하면 사라짐

// 수정 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 music 객체를 입력데이터로
//          변경 후 해당 객체 반환 (200: OK)
// - 실패 : id가 숫자가 아닐 경우 (400: Bad Request)
//          해당하는 id가 없을 경우 (404: Not Found)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { singer, title } = req.body;
// => const singer = req.body.singer; const title = req.body.title;
    if (singer) result.singer = singer;
    if (title) result.title = title;
    res.json(result);
};

// 삭제 (localhost:3000/api/music/:id)
// - 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴 (200: OK)
// - 실패 : id가 숫자가 아닌 경우 (400: Bad Request)
//          해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) res.status(400).end();

    result = music.find(m => m.id === id);
    if (!result) return res.status(404).end();

    music = music.filter(m => m.id !== id); // DB 연동을 안 해서 실제 삭제는 아니지만 삭제 효과
    res.json(music);
};

module.exports = { list, detail, create, update, remove };