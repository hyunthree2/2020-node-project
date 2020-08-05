function add(a, b) {
    return a + b;
};

console.log(add(2, 3));

let add2 = function (a, b) {
    return a + b;
};

console.log(typeof add2);

let add3 = (function (a, b) {
    return a + b;
})(2, 3);

console.log(typeof add3);
console.log(add3);

let add4 = ((a, b) => a + b)(2, 3); // 한 줄이라 중괄호, return 생략 가능

console.log(add4);