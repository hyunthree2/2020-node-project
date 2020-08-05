// 데이터
let nextId = 4;
let movie = [
    { id: 1, title : "라라랜드", director : "데이미언 셔젤", year : "2016"},
    { id: 2, title : "싱스트리트", director : "존 카니", year : "2016"},
    { id: 3, title : "위플래쉬", director : "데이미언 셔젤", year : "2014"},
];

// 목록 조회 (localhost:3000/movie)
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(movie.slice(0, limit));
};

// 상세 조회 (movie/:id)
const detail = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.filter((m) => m.id === id)[0];
    if (!result) return res.status(404).end();
    res.json(result);
};

// 등록
const create = (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) return res.status(400).end();
    const m = { id: nextId++, title, director, year };
    movie.push(m);
    res.status(201).json(m);
};

// 수정 (/movie/:id)
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    const { title, director, year } = req.body;
    if (title) result.title = title;
    if (director) result.director = director;
    if (year) result.year = year;
    res.json(result);
};

// 삭제
const remove = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) res.status(400).end();

    result = movie.find(m => m.id === id);
    if (!result) return res.status(404).end();

    movie = movie.filter(m => m.id !== id);
    res.json(movie);
};

module.exports = { list, detail, create, update, remove };