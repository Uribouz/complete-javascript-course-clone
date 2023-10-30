'use strict';


console.log('Use strict ----------------------');
//Use strict
let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true;
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');


//-------------------------------------------------------------------------------
console.log('Functions ----------------------');
//Functions ----------------------
function logger() {
    console.log('My name is ball');
}

logger();
logger();
logger();

function fruitProcessor(apples ,oranges) {
    console.log(apples, oranges);
    const juice = `Juices with ${apples} apples and ${oranges} oranges.`;
    return juice
}

const appleJuice = fruitProcessor(5,0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2,4);
console.log(appleOrangeJuice);


//-------------------------------------------------------------------------------
console.log('Function Declaration vs Expression ----------------------');

//Function declaration
function calAge(birthYear) {
    return 2037 - birthYear;
}
console.log('age: '+calAge(1991));

//Function expression
const calAge2 = function(birthYear) {
    return 2037 - birthYear;;
}
console.log('age: '+calAge2(1991));


//-------------------------------------------------------------------------------
console.log('Arrow Functions ----------------------');
//Has no 'this' keyword.

const calAge3 = birthYear => 2037 - birthYear;
console.log('age: '+calAge3(1991));

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement =  65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement}`;
}

console.log(yearsUntilRetirement(1994, 'Ball'));


//-------------------------------------------------------------------------------
console.log('Functions Calling other functions ----------------------');

const cutFruitPieces = fruit => fruit * 4;

function fruitProcessor2(apples ,oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juices with ${applePieces} apples and ${orangePieces} oranges.`;
    return juice
}

console.log(fruitProcessor2(2,3));


// //-------------------------------------------------------------------------------
// console.log('Reviewing functions ----------------------');

// const calAge4 = function(birthYear) {
//     return 2037 - birthYear;
// }

// const yearsUntilRetirement2 = (birthYear, firstName) => {
//     const age = calAge4(birthYear);
//     const retirement =  65 - age;

//     if (retirement > 0) {
//         return retirement;
//     } else {
//         return -1;
//     }

//     return retirement;
//     // return `${firstName} retires in ${retirement}`;
// }


// console.log(yearsUntilRetirement2(1994, 'Ball'));