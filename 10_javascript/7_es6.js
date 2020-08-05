// var 함수레벨 let 블록레벨

let a = 10;
let b = [1, 2, 3];
let c = {};

const d = 10;


let n1 = "원", n2 = "필";

let name = "My name is " + n1 + " " + n2 + ".";
console.log(name);

// 템플릿 문자열(`)
let name2 = `My name is ${n1} ${n2}.`;
console.log(name2);


var hello = function () {
    console.log("hello");
}
hello();

(function () {
    console.log("hello");
})();

// 화살표 함수
var hello = () => console.log("hello")
hello();

(() => console.log("hello"))();

//바꿔보기

// 매개변수 1개 함수
function print(a) {
    console.log(a);
};
print("펭수");

// 익명함수
var print = function (a) {
    console.log(a);
}
print("펭수");

// 호출함수
(function (a) {
    console.log(a);
})("펭수");

// 화살표함수
var print = (a) => {
    console.log(a);
}
print("펭수");

((a) => {
    console.log(a);
})("펭수");

// 매개변수 2개
// function add(a, b) {
//     return a + b;
// };
// add(2, 3);

// 익명함수
// let add = function (a, b) {
//     return a + b;
// }
// console.log(add(2, 3));

// 호출함수
var result = (function (a, b) {
    return a + b;
})(2, 3);
console.log(result);

// 화살표함수
let add = (a, b) => a + b

console.log(((a, b) => a + b)(2, 3));