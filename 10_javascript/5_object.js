let a = {}; // 배열은 [] 객체는 {}
let b = new Object();

console.log(typeof a);

// 객체에는 속성과 메소드 담을 수 있음

let Person = {};
Person.age = 5; // object.속성명
Person["name"] = "김원필"; // object["속성명"]
console.log(Person);

// key : value
let Person2 = {
    age: 7,
    name: "박제이"
};

console.log(Person2.age);
console.log(Person2["name"]);

Person2.add = function () {
    console.log("저는 %d살인데 브이앱하는 %s입니다.", this.age, this.name)
}

Person2.add();

let Person3 = {
    age: 6,
    name: "강영현",
    print() {
        console.log("저는 %d살인데 브이앱하는 %s입니다.", this.age, this.name)
    }
};

Person3.print();

// Friends 배열 안에 두 개의 객체 생성
// 객체 속성: no, name

let Friends = [
    {
        no: 23,
        name: "이현선"
    },
    {
        no: 19,
        name: "이혜민"
    }
];

console.log(Friends);
console.log(Friends[0]);
console.log(Friends[0].name);
console.log(Friends[1]["name"]);

let grades = {
    data: {
        kor: 100, mat: 90, eng: 95
    },
    print() { // print : function() 줄여서 쓰기 가능
        for (subject in this.data) {
            console.log(subject + " : " + this.data[subject]); // this.data.subject나 ["subject"]는 subject라는 key를 찾음
        }
    }
};

grades.print();

console.log(grades.data.mat);
console.log(grades.data["mat"]);
console.log(grades["data"].mat);
console.log(grades["data"]["mat"]);

let id = 116;
let name = "박성진";

let obj = {
    id,
    name
};

console.log("%d, %s", obj.id, obj.name);