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
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-04-22T01:36:17.929Z',
    '2023-04-27T10:51:36.790Z',
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

const formatMovementDate = (date,locale) => {
  const calcDaysPassed = ((date1,date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 *60 *24)));

  const daysPassed = calcDaysPassed(new Date(),date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  
  return Intl.DateTimeFormat(locale).format(date);

}

const formatCur = (value,locale,currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date,acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);
    
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formattedMov;
};

const calcDisplaySummary = function (acc) {

  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);
  
  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .filter((int, i, arr) => {
    // console.log(arr);
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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

const startLogOutTimer = (() => {
  let time = 10;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2,'0');
    const sec = String(Math.trunc(time % 60)).padStart(2,'0');
    //In each call,print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if(time === 0) {
      clearInterval(timer)
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  }
  //Set timer to 5 minutes
  tick();
  //Call the timer every second
  const timer = setInterval(tick,1000)

  return timer;
})

///////////////////////////////////////
// Event handlers
let currentAccount,timer;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Will format and display date 
    const now = new Date()

    const options = {
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'numeric',
      year:'numeric',
    }
    
    // const locale = navigator.language;
    // Instead above we will use the currentAccount.locale
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale,options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';
    console.log(receiverAcc);

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    console.log(currentAccount.movementsDates);

    // Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  
  const amount = Math.floor(inputLoanAmount.value);
  
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);
      
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      
      // Update UI
      updateUI(currentAccount);
    },2500)
  }
  inputLoanAmount.value = '';

  //Reset Timer
  clearInterval(timer);
  timer = startLogOutTimer();
  
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing  (must start with number)
console.log(Number.parseInt('30px',10));// Output: 30
console.log(Number.parseInt('e23',10));// Output: NaN

console.log(Number.parseInt('2.5rem'));// Output: 2
console.log(Number.parseFloat(' 2.5rem '));// Output: 2.5

// Checking if value is NaN
console.log(Number.isNaN(20));// Output: false
console.log(Number.isNaN('20'));// Output: false
console.log(Number.isNaN(+'20x'));// Output: true
console.log(Number.isNaN(23 / 0));// Output: false

// Checking if value is number
console.log(Number.isFinite(20));// Output: true
console.log(Number.isFinite('20'));// Output: false
console.log(Number.isFinite(+'20x'));// Output: false
console.log(Number.isFinite(23 / 0));// Output: false

console.log(Number.isInteger(23));// Output: true
console.log(Number.isInteger(23.0));// Output: true
console.log(Number.isInteger(23 / 0));// Output: false

//----------------------------------------------------------------------------------------



console.log(25 ** (1/2));//Output: 5
//Same as above
console.log(Math.sqrt(25));//Output: 5
console.log(8 ** (1/3));//Output: 2

console.log(Math.max(5,18,23,11,2));//Output: 23
console.log(Math.max(5,'18',23,11,2));//Output: 23
console.log(Math.max(5,'23px',23,11,2));//Output: NaN

console.log(Math.min(5,23,23,11,2));//Output: 2

// The area of a circle with 10px radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);//Output: 314.1592653589793

// Gives a random number between 1-6
console.log(Math.trunc(Math.random() * 6) + 1);

// Function that will give random number between min + 1 and max values
const randonInt = (min,max) => Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randonInt(10,12));


console.log('---------------------------');

// Rounding integers
console.log(Math.round(23.3));//Output: 23
console.log(Math.round(23.9));//Output: 24

console.log(Math.ceil(23.3));//Output: 24
console.log(Math.ceil(23.9));//Output: 24

console.log(Math.floor(23.3));//Output: 23
console.log(Math.floor('23.9'));//Output: 23

console.log(Math.trunc(23.3));//Output: 23

console.log(Math.trunc(-23.3));//Output: -23
console.log(Math.floor(-23.3));//Output: -24


// Rounding decimals (return string)
console.log((2.7).toFixed(0));//Output: 3
console.log((2.7).toFixed(3));//Output: 2.700    (string)
console.log(+(2.7).toFixed(3));//Output: 2.7    (number)

//----------------------------------------------------------------------



// Reminder operator (The value that is left in a devision)
console.log(5 % 2);//Output: 1
console.log(8 % 3);//Output: 2
console.log(6 % 2);//Output: 0

// Function that checks if a number is even
const isEven = n => n % 2 === 0;
console.log(isEven(8));//Output: true
console.log(isEven(23));//Output: false
console.log(isEven(514));//Output: true

// On click the even rows will change their color to orangered and every third row in blue
labelBalance.addEventListener('click', (e) => {
  e.preventDefault();
  [...document.querySelectorAll('.movements__row')]
   .forEach((row,i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
   })
})

//------------------------------------------------------------------



const diameter = 287_460_000_000;
console.log(diameter);//Output: 287460000000

const price = 345_99;
console.log(price);//Output: 34599

const transferFee1 = 15_00;
console.log(transferFee1);//Output: 1500

const transferFee2 = 1_500;
console.log(transferFee2);//Output: 1500

const PI = 3.14_15;
console.log(PI);//Output: 3.1415

console.log(Number('230_000'));//Output: NaN
console.log(parseInt('230_000'));//Output: 230

//-------------------------------------------------------------------------------



// numbers bigger then that are not safe
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
// will not be accurate
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// 2020: BigInt 
console.log(484848484846262558484526547455n);
// Will loose precision
console.log(BigInt(484848484846264454554));
// Will be accurate
console.log(BigInt(4848484848462644));

// Operations
console.log(10000n + 10000n);
console.log(38498934843437934734979384n * 44903580934n);

const huge = 2547848485959449894n
const num = 1;
console.log(huge * BigInt(num));// Output: 2547848485959449894n

// Exceptions
console.log(20n > 15);// Output: true
console.log(20n === 20);// Output: false
console.log(typeof 20n);// Output: bigint
console.log(20n == '20');// Output: true

// Divisions 
console.log(11n / 3n);// Output: 3n
console.log(10 / 3);// Output: 3.3333333333333335

//----------------------------------------------------------------------------


// Create a date 

const now1 = new Date();
console.log(now1);// Output: Thu Apr 27 2023 21:51:20 GMT+0300

console.log(new Date('Apr 27 2023'));// Output: Thu Apr 27 2023 00:00:00 GMT+0300
console.log(new Date('December 24 , 2015'));// Output:Thu Dec 24 2015 00:00:00 GMT+0200
console.log(new Date(account1.movementsDates[0]));// Output:Mon Nov 18 2019 23:31:17 GMT+0200

// Will show november because the monthes are 0 based
console.log(new Date(2037, 10 , 19 , 15, 23, 5));//Output:Thu Nov 19 2037 15:23:05 GMT+0200

console.log(new Date(2037, 10 , 31));//Output: Tue Dec 01 2037 00:00:00 GMT+0200 

// will return the date of the epoch 
console.log(new Date(0));//Output: Thu Jan 01 1970 02:00:00 GMT+0200

// will return the 3 days after the epoch 
console.log(new Date(3 * 24 * 60 * 60 * 1000));//Output: Sun Jan 04 1970 02:00:00 GMT+0200

// Working with dates
const future = new Date(2037,10,19,15,23);
console.log(future);//Output: Thu Nov 19 2037 15:23:00 GMT+0200
console.log(future.getFullYear());//Output: 2037
console.log(future.getMonth());//Output: 10
console.log(future.getDate());//Output: 19
console.log(future.getHours());//Output: 15
console.log(future.getMinutes());//Output: 23
console.log(future.getSeconds());//Output: 0
// The time that passed since the epoch
console.log(future.getTime());//Output: 2142249780000

console.log(new Date(2142249780000));//Output: Thu Nov 19 2037 15:23:00 GMT+0200

console.log(Date.now());//Output: 1682623132409

// This will change the year  there is methods for all date parameters
future.setFullYear(2040);//Output: Mon Nov 19 2040 15:23:00 GMT+0200
console.log(future);


//---------------------------------------------------------------------------



const future1 = new Date(2037,10,19,15,23);

const calcDaysPassed = (date1,date2) => Math.abs(date2 - date1) / (1000 * 60 *60 *24);

const days1 = calcDaysPassed(new Date(2037, 3, 14),new Date(2037, 3, 24));
console.log(days1);//Output: 10

//-----------------------------------------------------------------------

// This will by english usa format
const nowNew = new Date();
console.log(new Intl.DateTimeFormat('en-US').format());//Output:4/28/2023



// We can find iso language code table at http://www.lingoes.net/en/translator/langcode.htm
const nowNew = new Date();
// We can configure the options we can also give value short or 2-digit
const options1 = {
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'long',
  year:'numeric',
  weekday:'long',
}

//Takes the locale language 
const locale1 = navigator.language;

console.log(new Intl.DateTimeFormat('en-US',options1)
  .format());//Output:Friday, April 28, 2023 at 9:49 PM

// If we pass the local variable it will take the language of the pc
console.log(new Intl.DateTimeFormat(locale1,options1)
  .format());//Output:Friday, April 28, 2023 at 9:49 PM


//--------------------------------------------------------------



const num1 = 36565665.23;

const options2 = {
  style: "unit",
  unit: "mile-per-hour"
}

const options3 = {
  style: "currency",
  unit: "celsios",
  currency: 'Eur'
}

console.log('US:',new Intl.NumberFormat('en-US').format(num1));//Output:US: 36,565,665.23
console.log('Germany:',new Intl.NumberFormat('de-DE').format(num1));//Output:Germany: 36.565.665,23
console.log('Syria:',new Intl.NumberFormat('ar-SY').format(num1));//Output:Syria: ٣٦٬٥٦٥٬٦٦٥٫٢٣
console.log('Browser:',new Intl.NumberFormat(navigator.language).format(num1));//Output:Browser: 36,565,665.23

console.log('Browser:',new Intl.NumberFormat(navigator.language,options2).format(num1));//Output:Browser: 36,565,665.23 mph

//-------------------------------------------------------------------


const ingredients = ['olives','spinach']
// First the 'Waiting message will appear and then the message in the timer '
// setTimeout will execute after 3 seconds and have 2 arguments
const pizzeTimer = setTimeout((ing1,ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),3000,...ingredients);
console.log('Waiting...');

// If the pizza have spinach we will cancel the timeout
if(ingredients.includes('spinach')) clearTimeout(pizzeTimer)

// setInterval the function will execute and display a clock every 1 second
const clockInterval = setInterval(() => {
  const now = new Date();
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
},1000)

// This will clear the interval
clearInterval(clockInterval)

*/
