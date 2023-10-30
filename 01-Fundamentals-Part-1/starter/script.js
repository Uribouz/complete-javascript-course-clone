/*
let js = 'amazing';

let year
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);

let age = 30;
age = 31;


let x, y;
x = y = 25 - 10 -5;
console.log(x, y);
*/

 let markWeight = 78.0;
 let markHeight = 1.69;
 let johnWeight = 92;
 let johnHeight = 1.95;

 function calBMI(mass, height) { 
    let BMI = mass / (height * height);
    return BMI;
 }

 markBMI = calBMI(markWeight, markHeight)
 johnBMI = calBMI(johnWeight, johnHeight)

 let markHigherBMI = (markBMI>johnBMI);

 console.log('MarkBMI: ' + markBMI);
 console.log('JohnBMI: ' + johnBMI);
 console.log('MarkHigherBMI: ' + markHigherBMI);

 function logBMI(firstPerson, firstBMI, nextPerson, nextBMI) { 
    console.log(`${firstPerson}'s BMI (${firstBMI}) is higher than ${nextPerson}'s (${nextBMI})!`);
 }

if (markBMI>johnBMI) {
    logBMI("Mark",markBMI.toFixed(1), "John", johnBMI.toFixed(1) );
} else if (markBMI < johnBMI) {
    logBMI("John",johnBMI.toFixed(1), "Mark", markBMI.toFixed(1) );
}


 //--------------------
// const firstName = "Ball";
// const job = 'engineer';
// const birthYear = 1994;
// const year = 2022;
// const ball = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
// console.log(ball);

// console.log(`String
// Multiple
// lines`);


//20.-----------------
//type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);

console.log(Number('Ball'));

console.log(typeof NaN);

console.log(String(23), 23);

//type coercion
console.log('I am' + 23 + ' years old');
console.log('23' - '10' + 3);
console.log('23' + '10' + 3);

//Truthy and Falsy values
// False: 0, '', undefined, null, NaN
console.log('Truthy and Fals');
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));

console.log(Boolean('Ball'));

let age;
if (age) {
    console.log('age valid');
} else {
    console.log('age not valid');
}

//Equality operatos 
const age2 = '18';
//'===' no type coercion
if (age2 === 18) console.log('You just become an adult (strict)');

//'==' Have type coercion
if (age2 == 18) console.log('You just became and adult (loose)');

