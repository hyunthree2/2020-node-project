var arr = [1, 2, 3, 4, 5];
console.log(arr.length);
console.log(arr[2]);

let arr2 = [1, 2, "apple", "banana"];
console.log(arr2[2]);

for (i = 0; i < arr2.length; i++) {
    console.log(i, arr2[i]);
}

for (i in arr2) { // for in -> 인덱스 꺼내기
    console.log(i);
}

for (i of arr2) { // for of -> 값 꺼내기
    console.log(i);
}

let a = ["a", "b", "c"];
a.splice(1, 0, "d");
console.log(a);

a.splice(2, 1, "x", "y");
console.log(a);

const b = [1, 2, 3, 4, 5];
console.log(b.slice(0, 3));

const result = b.find(item => item >= 3); // 3, 4, 5 중 맨 처음 거 = 3
console.log(result);

const result2 = b.filter((item) => item >= 3); // 조건 true인 거 전체 = 3,4,5
console.log(result2);

const result3 = b.map((item) => item * 2);
console.log(result3);