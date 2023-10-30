'use strict';


console.log('Test');
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Ball'
let job = 'Engineer'
const year = 1994

console.log(addDecl(2,3));
// console.log(addExpr(2,3));
console.log(addArrow);

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
}

var addArrow = (a,b) => a + b;

if (!numProducts) deleteShopppingCart();

var numProducts = 10;

function deleteShopppingCart() {
    console.log('All roducts deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);