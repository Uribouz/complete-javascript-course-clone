'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Internal Functions
const createUserNames = function (accts) {
  accts.forEach( acc =>
    acc.username = acc.owner.toLowerCase()
                  .split(' ')
                  .map( (value) => value[0] )
                  .join('')
  );
}

const calcDisplayBalance = function(account) {
  const movements = account.movements;
  account.balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} EUR`;
}

const calcDisplaySummary = function (account) {
  const interestRate = account.interestRate;
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc,mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcomes)}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * interestRate/100)
    .filter(int => int >= 1)
    .reduce((acc,int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}`;
}

/////////////////////////////////////////////////

const updateUI = function(account) {
    //Display movements
    displayMovements(account.movements);

    //Display balance
    calcDisplayBalance(account);

    //Display summary
    calcDisplaySummary(account);
}


//Main
let currentAccount;
let isSort;

createUserNames(accounts);

btnLogin.addEventListener('click', function(e) {
  e.preventDefault();

  currentAccount = accounts
    .find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if ( currentAccount?.pin === Number(inputLoginPin.value) ) {
    console.log('LOGIN');
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //Clear input fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
   
    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (amount > 0 
    && receiverAccount
    && amount <= currentAccount.balance
    && receiverAccount?.username !== currentAccount.username) {
      
      //Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      console.log('Transfer Completed');
    
      updateUI(currentAccount);
  }
})

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if (currentAccount.username === inputCloseUsername.value
    && currentAccount.pin === Number(inputClosePin.value)) {
      console.log('Delete');
      const index = accounts.findIndex(acc => acc.username === inputCloseUsername.value)
      
      inputCloseUsername.value = inputClosePin.value = '';

      // Delete Account
      accounts.splice(index,1);

      //Hide UI
      containerApp.style.opacity = 0;

    }
})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some( mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    inputLoanAmount.value = '';
    inputLoanAmount.blur();

    //Update UI
    updateUI(currentAccount);
  }
});

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a,b)=>a-b) : movements;
  movs.forEach(function(mov,i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} deposit</div>
    <div class="movements__value">${mov}</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

btnSort.addEventListener('click', function(e) {
    e.preventDefault();
    isSort = !isSort
    displayMovements(currentAccount.movements, isSort);
});

labelBalance.addEventListener('click', function() {
  const movementsUI = Array.from(document.
    querySelectorAll('.movements__value'),
    el => Number(el.textContent)
    );

  console.log(movementsUI);
})

//////////////////////////////////////////////////////////////////////////////////////////////////////
// 1.
  const bankDepositSum = accounts.flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov,0);
  console.log(bankDepositSum);

//2. Usage of reduce, count items
  const numDeposits1000Old = accounts.flatMap(acc => acc.movements)
    .filter(mov => mov > 1000)
    .length;
  console.log(numDeposits1000Old);

  const numDeposits1000Bad =  accounts.flatMap(acc => acc.movements)
    .reduce((count, mov) => mov > 1000 ? count++ : count, 0)
  console.log(numDeposits1000Bad)

  const numDeposits1000Better =  accounts.flatMap(acc => acc.movements)
    .reduce((count, mov) => mov > 1000 ? ++count : count, 0)
  console.log(numDeposits1000Better)

//3. Usage of reduce, new object
  //Old
  const sums = accounts.flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
      cur > 0 ? sums.deposits += cur: sums.withdrawals += cur;
      return sums;
    }, {deposits: 0, withdrawals: 0})

  console.log(sums)

  //Better
  const {deposits, withdrawals} = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
      cur > 0 ? sums.deposits += cur: sums.withdrawals += cur;
      return sums;
    }, {deposits: 0, withdrawals: 0})
  console.log(deposits, withdrawals)
    

  //Best
  const {depositsBetter, withdrawalsBetter} = accounts
    .flatMap(acc => acc.movements)
    .reduce((sums, cur) => {
      sums[cur > 0 ? 'depositsBetter' : 'withdrawalsBetter'] += cur;
      return sums;
    }, {depositsBetter: 0, withdrawalsBetter: 0})
  console.log(depositsBetter, withdrawalsBetter)
    

  //4. Title Cases
  // this is a nice title -> This Is aa Nice Title

    const convertTitleCase = function(title) {};
    console.log()