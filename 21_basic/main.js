var calc = require('./module');
var calc2 = require('./module2');

a=10
b=20

console.log(calc.add(a,b));
console.log(calc.sub(a,b));

console.log(calc2.mul(a,b));
console.log(calc2.div(a,b));

console.log(exports === module.exports);