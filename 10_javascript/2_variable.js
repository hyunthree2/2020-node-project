var a = 1;
var b = 2;
c = 3;
console.log(a);
console.log(b);
console.log(c);
console.log("%d, %d, %d", a, b, c);
console.log(a, b, c);

var s1 = "Hello";
var s2 = 'World';
console.log(s1, s2);
console.log("%s %s", s1, s2);

console.log(typeof a);
console.log(typeof s1);
console.log(typeof true);
console.log(typeof {});

function foo() {

    console.log(d); // 변수 호이스팅(hoisting)
    var d = 10;
    console.log(d);
}

foo();

let e = 10;
// ES6 : let으로 하면 블럭 레벨 스코프(다른 언어처럼 저 함수 안에서만)
// var tmp = 0이라고 하면 2: 0 으로 출력 됨
function foo2() {
    if (true) {
        var tmp = 0;
        console.log("1:", tmp);
    }
    console.log("2:", tmp);
}

foo2();

const v = 10;
//v++;