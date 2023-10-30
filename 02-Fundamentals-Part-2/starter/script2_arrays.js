'use strict';

//-------------------------------------------------------------------------------
console.log('Arrays ----------------------');

const years = new Array(1991, 1984, 1996, 2008, 2020);
console.log(years);
console.log(years[1]);

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length-1]);

const firstName = 'Ball';
const ball = [firstName, 'Opas', 2037-1994, 'engineer', friends];
console.log(ball);
console.log(ball.length);

friends[2] = 'Jay';
console.log(friends[2]);

//-------------------------------------------------------------------------------
console.log('Basic Array Operations ----------------------');

const friends2 = ['Michael', 'Steven', 'Peter'];
console.log(friends2);

//Add as last element
friends2.push('Tom');
console.log(friends2);

//Add as first element
friends2.unshift('John');
console.log(friends2);

//Remove last element
friends2.pop();
const popped = friends2.pop();
console.log(popped);
console.log(friends2);

//Remove first element
friends2.shift();
console.log(friends2);

//Index of the search string
console.log(friends2.indexOf('Steven'));
console.log(friends2.indexOf('Bob'));


//Check if the string in the array
friends2.push(23);
console.log(friends2);
console.log(friends2.includes('Steven'));
console.log(friends2.includes('Bob'));
console.log(friends2.includes('23'));
console.log(friends2.includes(23));

if (friends2.includes('Peter')) {
    console.log('You have a friend called Peter');
}
if (friends2.includes('Steven')) {
    console.log('You have a friend called Steven');
}