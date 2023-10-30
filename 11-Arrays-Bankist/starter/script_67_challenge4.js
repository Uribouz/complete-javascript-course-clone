'use strict';
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying 
if dogs are eating too much or too little.

Eating too much means the dog's current food portion is larger 
than the recommended portion, and eating too little is the opposite.

Eating an okay amount means the dog's current food portion is 
within a range 10% above and 10% below the recommended portion (see hint).

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];


//Answers: ----------------------------------------------------------------

/*
1. Loop over the array containing dog objects, and for each dog,
calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. 
Forumla: recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)
*/
console.log('1.recommendedFood');
dogs.forEach(function (dog) {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);

/*
2. Find Sarah's dog and log to the console whether it's eating too much or too little.
 HINT: Some dogs have multiple owners, 
 so you first need to find Sarah in the owners array, 
 and so this one is a bit tricky (on purpose) 🤓
*/

console.log('2.sarahDog');
function checkEatingCondition(dog) {
  if (dog.curFood > dog.recommendedFood) {
    console.log('This dog eating too much')
  } else {
    console.log('This dog eating too little')
  }
}
// const sarahDog = dogs.find(dog => dog.owners.some(owner => owner === 'Sarah'));
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
checkEatingCondition(sarahDog);


/* 
3. Create an array containing all owners of dogs who eat too much
 ('ownersEatTooMuch') 
 and an array with all owners of dogs who eat too little 
 ('ownersEatTooLittle').
 */

console.log('3.ownersEatTooMuch');
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log('3.ownersEatTooLittle');
const ownersEatTooLittle = dogs.filter(dog => dog.curFood <= dog.recommendedFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);


/*
4. Log a string to the console for each array created in 3.,
 like this: "Matilda and Alice and Bob's dogs eat too much!" 
 and "Sarah and John and Michael's dogs eat too little!"
*/


console.log('4.LogToConsole');
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

/*
5. Log to the console whether there is any dog eating 
EXACTLY the amount of food that is recommended (just true or false)
*/
console.log('5.Any dog eat exactly recommended amount of food')
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));


/*
6. Log to the console whether there is any dog eating 
an OKAY amount of food (just true or false)
*/
console.log('6.Any dog eat an okay recommended amount of food')
// function isDogEatOkay(curFood, recommendedFood) {
//   return  curFood > (recommendedFood * 0.90) && curFood < (recommendedFood * 1.10) 
// }
const isDogEatOkay = dog =>
  dog.curFood > (dog.recommendedFood * 0.90) 
  && dog.curFood < (dog.recommendedFood * 1.10);

// console.log(dogs.some(dog => isDogEatOkay(dog.curFood, dog.recommendedFood)));
console.log(dogs.some(isDogEatOkay));

/*
7. Create an array containing the dogs that are eating 
an OKAY amount of food (try to reuse the condition used in 6.)
*/
console.log('7.Array dogs eat an okay recommended amount of food')
// const dogsEatOkay = dogs.filter(dog => isDogEatOkay(dog.curFood, dog.recommendedFood));
const dogsEatOkay = dogs.filter(isDogEatOkay);
console.log(dogsEatOkay);

/*
8. Create a shallow copy of the dogs array and sort it by 
recommended food portion in an ascending order 
(keep in mind that the portions are inside the array's objects)
 */
console.log('8.Copy Array of dogs sorted by recommended food ascending order')
const copyOfDogs = dogs.slice()
copyOfDogs.sort((a,b) => a.recommendedFood-b.recommendedFood);
console.log(copyOfDogs);

console.log('Old dogs:');
console.log(dogs);


// Ascending
// movements.sort((a,b)=>{
  // if (a>b) return 1;
  // if (a<b) return -1;
// });