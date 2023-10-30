'use strict';

let age = 30;
let oldAge = age;
age = 31;

console.log(age);
console.log(oldAge);

const me = {
    name: 'Ball',
    age: 28,
};
const friend = me;
friend.age = 27;
console.log('Friend:' , friend);
console.log('Me', me);

//-------------------


let lastName = 'Ball';
let oldLastName = lastName;
lastName = 'Big';
console.log(lastName, oldLastName);

// Copying objects
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alica', 'Bob'],
};

//Shallow copying
const marriedJessiace = Object.assign({}, jessica);
marriedJessiace.lastName = 'Davis';
marriedJessiace.family.push('Mary');
marriedJessiace.family.push('John');
console.log('Before marriage:' , jessica);
console.log('After marriage: ', marriedJessiace);