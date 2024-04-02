'strict mode';

//1. Always use 'const' or 'let' instead of 'var'
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//2.1 variable name should have clear meaning of what they are contain.
//2.2 Make this immutable (only shallow freeze, not deep freeze)
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
//! This will not change the object, because it is freezed.
// spendingLimits.jay = 200;
// console.log(spendingLimits);

const getLimit = (limits, user) =>limits?.[user] ?? 0;

//3.1 function name should have clear meaning of what they do.
//3.2 should use parameter default values where possible.
//3.3 this function should be pure function
const addExpense = function (
   state,
   limits,
   value,
   description,
   user = 'jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, user: cleanUser }] : state;
};

// console.log(budget);
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
// console.log(newBudget3);

// const checkExpenses2 = function (state, limits) {
//   return state.map( entry => {
//     return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'}: entry;
//   });
// };
const checkExpenses = (state, limits) =>
  state.map( entry => 
    entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'}: entry
  )

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure functions
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
  .filter(entry => entry.value <= -bigLimit)
  .map(entry => entry.description.slice(-2))
  .join(' / ');
  // .reduce((str, cur) => `${str}/${cur.description.slice(-2)}`,'')
  console.log(bigExpenses);
};
logBigExpenses(finalBudget, 1000);