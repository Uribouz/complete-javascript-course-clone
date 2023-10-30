'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-09-05T16:33:06.386Z',
    '2023-10-21T14:43:26.374Z',
    '2023-10-22T14:49:59.371Z',
    '2023-10-23T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long',
}

const formatDate = function(date) {
  const day = `${date.getDate()}`.padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${day}/${month}/${year}, ${hour}:${min}`;
}

const formatDateIntl = function(date, locale) {
  return new Intl.DateTimeFormat(locale,options).format(date)
}

const formatMovements = function(date, locale) {
  const calcDaysPassed = (date1, date2) =>  Math.round(
        Math.abs(date2 - date1)/(1000 * 60 * 60 * 24));
  const daysPassed =  calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  if (daysPassed <= 7) return `${daysPassed} days ago`
  return formatDateIntl(date, locale);
  // return formatDate(date);
}

const formattedCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(value)
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i])
    const dislayDate = formatMovements(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${dislayDate}</div>
        <div class="movements__value">${formattedCur(mov, acc.locale, acc.currency)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formattedCur(acc.balance.toFixed(2), acc.locale, acc.currency, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formattedCur(incomes.toFixed(2), acc.locale, acc.currency, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formattedCur(Math.abs(out).toFixed(2), acc.locale, acc.currency, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formattedCur(interest.toFixed(2), acc.locale, acc.currency, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time/60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user.
    if (time <= 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    
    //Decrease 1 second
    time--;
  }
  // Set time to 5 minutes
  let time = 120;
  // Call the timer every second
  tick();
  return setInterval(tick, 1000)
}
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Login Automatically
// currentAccount=account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


// day/month/year


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  
    const now = new Date();
    console.log(now);
    labelDate.textContent =formatDateIntl(now, currentAccount.locale)


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {// Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500)
  }
  inputLoanAmount.value = '';

  //Reset Timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 170: Converting and checkinbg numbers --------------
console.log('170: Converting and checkinbg numbers --------------');

/*
In Javascript int == float
*/
console.log(23 === 23.0);

//Base 10 - 0 to 9.
// 1/10 = 0.1
// 3/10 = 3.3333333
//Issue with number decimal points in Javascript
console.log('Issue with number decimal points in Javascript');
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//Convert string to number
console.log('Convert');
console.log(Number('23'));
console.log(+'23');

//Parsing string to number
console.log('parse');
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
console.log(Number.parseInt(' 2.5rem '));
console.log(Number.parseFloat(' 2.5rem '));

//if value if not a number
console.log('isNaN');
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));


//if value is number
console.log('IsFinite');
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

console.log('isInteger');
console.log(Number.isInteger(20));
console.log(Number.isInteger('20'));
console.log(Number.isInteger(+'20X'));
console.log(Number.isInteger(23 / 0));

// 171: Math and Rounding -------------------------------------------

console.log('171: Math and Rounding -------');
console.log(Math.sqrt(25));
console.log(25 ** (1/2));
console.log(8 ** (1/3));

console.log('Math.max');
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

console.log('Calculate area of the circle with its radius');
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('10px') ** 2);


console.log('Random number 1 - 6');
console.log((Math.trunc(Math.random() * 6)) + 1);


console.log('Better: random number generator');
const ranbdomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(ranbdomInt(10, 20));

console.log('Rounding integers');
console.log('Math.round');
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log('Math.ceil');
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log('Math.floor');
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));
console.log(Math.floor(-23.9));

console.log('Math.trunc');
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.9));
console.log(Math.trunc(-23.9));

console.log('Pad zeros to number, and convert to string');
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));



// 172:Remainder Operator -------------------------------------------

console.log('172:Remainder Operator -------');

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});


//  173: Number Seperators -------------------------------------------

console.log(' 173: Number Seperators -------');

const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee1 = 15_00;
console.log(transferFee1);
const transferFee2 = 1_500;
console.log(transferFee2);

// Invalid Usage
// constPI = 3_._1415_;
// console.log(PI);

console.log(Number('23000'));
console.log(Number('230_00'));

//  174: Working with BigInt -------------------------------------------

console.log(' 174: Working with BigInt -------');

//Bigest numbers, can store in variable
console.log(2**53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2**53 + 0);
console.log(2**53 + 1);
console.log(2**53 + 2);
console.log(2**53 + 3);

console.log(48123192318231298312312938123);
//BingInt Number
console.log(48123192318231298312312938123n);
// console.log(BigInt(481231923182));

// Operations
console.log(10000n + 10000n);
console.log(3213129319237192399n * 1000000n);

const huge = 20123010232103901203n;
const num = 23;
console.log(huge * BigInt(num));

console.log(20n > 15);
//doesn't equal: Bigint >> Integer
console.log(20n === 20);
console.log(typeof 20n);
console.log(typeof 20);

console.log(20n === '20');

console.log(huge + ' is Really Big!!!');

// Does not work ...
// console.log(Math.sqrt(16n));

// Divisions
console.log(11n / 3n); // Cut-off decimal

console.log(10 / 3);


//  175: Creating Dates -------------------------------------------

console.log(' 175: Creating Dates -------');


//Create a Date

const now2 = new Date();
console.log(now2)


console.log( new Date('Aug 02 2020 18:05:41'));

console.log( new Date('December 24, 2015'));

console.log(new Date(account1.movementsDates[0]));


console.log(new Date(2037, 10, 19, 15, 23, 5));

//Auto correct out invalid date
console.log(new Date(2037, 10, 31));
console.log(new Date(2037, 10, 33));

console.log(new Date(0));

console.log('Days * Hours * Minutes * Seconds * milliseconds');
console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date( 2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); //Thursday
console.log(future.getHours());

console.log(future.toISOString());
console.log(future.getTime());

//Convert milliseconds to Date
console.log(new Date(2142231780000));

//Convert milliseconds to Date
console.log(Date.now());

future.setFullYear(2040);

console.log(future);

console.log(now2);


//177. Operations with Dates

const future2 = new Date( 2037, 10, 19, 15, 23);
console.log(Number(future2));
console.log(+future2);
console.log(+future2);

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1)/(1000 * 60 * 60 * 24);

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(day1);
const day2 = calcDaysPassed(new Date(2037, 3, 24), new Date(2037, 3, 14));
console.log(day2);


//178.Internatiaonalizing Dates (Intl)
//Get locale from browser
const locale = navigator.language;
console.log(locale);

//Experimenting API
const myTextDate = new Intl.DateTimeFormat('th-TH',options).format(now2)
console.log(myTextDate);


//179. Internatiaonalizing Numbers (Intl)
const num2  = 3884764.23;

//unit, percent, currency

const optionsNum = {
  stype: 'unit',
  unit: 'celsius'
};

const optionsNumCurrency = {
  stype: 'currency',
  currency: 'EUR'
};

console.log('US: ', new Intl.NumberFormat('en-US', optionsNumCurrency).format(num2));
console.log('Germany: ', new Intl.NumberFormat('de-DE',optionsNumCurrency).format(num2));
console.log('Syria: ', new Intl.NumberFormat('ar-SY',optionsNum).format(num2));;
console.log('Thai: ', new Intl.NumberFormat('th-TH',optionsNum).format(num2));
console.log('Browser: ', new Intl.NumberFormat(navigator.language,optionsNum).format(num2));

//180. Timers: setTimeout and setInterval

//Asynchronous
const ingredients1 = ['olives','spinach']
const pizzaTimer1 = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`), 
  3000,
  ...ingredients1); 
console.log('Waiting...');
//Clear timer
if (ingredients1.includes('spinach')) clearTimeout(pizzaTimer1);


const ingredients2 = ['olives','ham']
const pizzaTimer2 = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`), 
  3000,
  ...ingredients2); 
console.log('Waiting...');
//Clear timer
if (ingredients2.includes('spinach')) clearTimeout(pizzaTimer2);

// setInterval
setInterval(function() {
  const now = new Date();
  console.log(now);
}, 1000);