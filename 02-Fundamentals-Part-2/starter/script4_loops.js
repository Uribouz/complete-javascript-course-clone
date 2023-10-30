'use strict';


console.log('For Loop ----------------------');

console.log('Lifting weights repetition 1 🏋️‍♂️' );
console.log('Lifting weights repetition 2 🏋️‍♂️' );

console.log('Add loop');
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♂️` );
}

const ballArray = [
    'Ball',
    'Opas',
    2037 - 1991,
    'Engineer',
    ['Johan', 'Nice']
];

const types = [];

for (let i = 0; i < ballArray.length; i++) {
    console.log(ballArray[i], typeof ballArray[i]);
    types[i] = typeof ballArray[i];
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i =0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}
console.log(ages);


console.log('Only String ----------------------');
for (let i = 0; i < ballArray.length; i++) {
    if (typeof ballArray[i] !== 'string') {
        continue;
    }
    console.log(ballArray[i], typeof ballArray[i]);
}

console.log('Break with number ----------------------');
for (let i = 0; i < ballArray.length; i++) {
    if (typeof ballArray[i] === 'number') {
        break;
    }
    console.log(ballArray[i], typeof ballArray[i]);
}


console.log('While loop ----------------------');
let rep = 1;
while (rep <= 10) {
    console.log(`While: lifting weights repetition ${rep} 🏋️‍♂️`);
    rep++
}

let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
    console.log(`You rolled a ${dice} 🎲`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) {
        console.log(`Loop is abount to end...`);
    }
}