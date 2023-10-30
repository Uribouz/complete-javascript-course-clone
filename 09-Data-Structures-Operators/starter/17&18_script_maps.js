'use strict';

//Maps
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

rest.set('categories', ['Italian','Pizzeria', 'Vegetarian','Organic'])
.set('open',11)
.set('close', 23)
.set(true, 'We are open')
.set(false, 'We are closed :(' );

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

//Check if restaurant open ?
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

//Check if map has key
console.log(rest.has('categories'));

//Delete item
rest.delete(2);
console.log(rest);

//Size
console.log(rest.size);

rest.clear();
console.log(rest);

//Key as array (pointer to array)
rest.set([1,2], 'Test');
console.log(rest);
console.log(rest.size);

//Cannot get key because not the same pointer
console.log(rest.get([1,2]));

rest.clear();

//Can get use array as key if it is the same pointer.
const arr = [1,2];
rest.set(arr, 'Test1234');
console.log(rest.get(arr));

//Maps: Iteration ----------------------------------------------------
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat','Sun'];
const openingHours = {
    [weekdays[3]]: {
      open: 12,
      close: 22,
    },
    [weekdays[4]]: {
      open: 11,
      close: 23,
    },
  //   [`${weekdays[5]}urday`]: {
    [weekdays[5]]: {
      open: 0, // Open 24 hours
      close: 24,
    },
  };

const question = new Map([
    ['question', 'What is the best programming language in the world ?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'Javascript'],
    ['correct', 3],
    [true, 'Correct 😊'],
    [false, 'Try agan!'],
]);
console.log(question);

//Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

const isCorrect = question.get('correct') === answer;
console.log(isCorrect);
console.log(question.get(isCorrect));

console.log(question);

//Convert Map to array
console.log(question.entries());
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);