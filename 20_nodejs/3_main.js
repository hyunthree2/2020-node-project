const calc2 = require("./3_module"); // ./ 안 찍으면 nodejs 설치된 위치 찍음
const calc3 = require("./3_module2");

console.log(calc2.calc.add(3, 4));
console.log(calc2.calc.sub(3, 4));

console.log(calc3.mul(2, 3));
console.log(calc3.div(2, 3));

console.log(exports === module.exports);