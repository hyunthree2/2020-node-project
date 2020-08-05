// 동기식 처리
function add(a, b) {
    let sum = a + b;
    return sum;
}

function print(result) {
    console.log(result);
}

print(add(2, 3));

// 비동기식 처리
function add2(a, b, callback) {    
    let sum = a + b;
    callback(sum);
}

add2(2, 3, print);

// 익명함수
add2(2, 3, function (result) {
    console.log(result);
});

add2(2, 3, (result) => console.log(result));