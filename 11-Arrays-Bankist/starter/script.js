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

const displayMovements = function(movements,sort = false) {

  //Here we empty the inner HTML
  containerMovements.innerHTML = '';

  // Here we will create copy of the movements array in ascending order if the sort is true
  const movs = sort ? movements.slice().sort((a,b) => a - b ): movements;

  movs.forEach((mov,i) => {
    const type = mov >= 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>`;

      // containerMovements is the div we want to insert the html and we add each html element at the
      // begining of the div
      containerMovements.insertAdjacentHTML('afterbegin', html);


  });

}


//--------------------------------------------------------------------------------------------

//Here we will calculate the income,outcome and the interst of the account and then display them in the UI
const calcDisplaySummary = ((acc) => {

  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  
  const out = acc.movements.filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov,0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  
  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * acc.interestRate/100)
  .filter((int, i,arr) => {
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
});

//--------------------------------------------------------------------------------------------

// createUserNames function will take the first letter of each word of the user and make it one word
// Then we will add it to the accounts array
const createUserNames = (accs) => {
  accs.forEach((acc)=> {
    acc.username = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('');
  })
}

createUserNames(accounts);
console.log(accounts);

const updateUI = ((acc) => {
      //Display movements
      displayMovements(acc.movements);

      //Display balance
      calcDisplayBalance(acc);
  
      //Display summary
      calcDisplaySummary(acc);
})

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// New array with deposits
const deposits = movements.filter(mov => mov > 0);

// New array with withdrawals
const withdrawals = movements.filter(mov => mov < 0);

// Here we calculate the balance and display it 
const calcDisplayBalance = ((acc) => {
  // accumulator => snowball the result is one single value
  acc.balance = acc.movements.reduce((acc, cur) => cur += acc,0 );
  labelBalance.textContent = `${acc.balance}€`
})

//--------------------------------------------------------------------------

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', (e) => {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  // First we need to check with question mark if currentAccount exist if yes we will continue and compare the pin with
  // the inputLoginPin value
  if(currentAccount?.pin === Number(inputLoginPin.value)){

    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // The blur method will clear the focus on the field(in my case it happend without that line)
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  };
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click',(e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov=> mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const user = accounts.find((user) => user.username === inputCloseUsername.value && user.pin === Number(inputClosePin.value));

  if(user) { 
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    
    // Delete account
    accounts.splice(index, 1);
    console.log(accounts);
    
    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Wrong credentials');
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//Here we will create a variable of sorting
let sorted = false;

// Here we will change the order in the movements container
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  //Here we will pass the opposite of sorted 
  displayMovements(currentAccount.movements, !sorted);
  // Here we will flip the value 
  sorted = !sorted;
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////


/*

let arr = ['a','b','c','d','e'];

// Slice method
// Dosen't change the original array
console.log(arr.slice(2));//Output:['c', 'd', 'e']
console.log(arr.slice(2,4));//Output:['c', 'd']
console.log(arr.slice(-2));//Output:['d', 'e']
console.log(arr.slice(-1));//Output:['e']
console.log(arr.slice(1,-2));//Output:['b', 'c']

console.log(arr.slice());//Shallow copy
console.log([...arr]);//Same as above

// Splice
// Changes the original array
// console.log(arr.splice(2));
arr.splice(-1);//Will delete the last element
console.log(arr);
arr.splice(1,2);//Will delete 2 elements from index 1 to 2
console.log(arr);

// Reverse
// Changes the original array
arr = ['a','b','c','d','e'];
const arr2 = ['j','i','h','g','f'];
console.log(arr2.reverse());//Output:['f', 'g', 'h', 'i', 'j'];
console.log(arr2);//Output:['f', 'g', 'h', 'i', 'j'];

// Concat
// Dosen't change the original array
const letters = arr.concat(arr2);//Output:['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
console.log(letters);
console.log(...arr,...arr2);// Same as above

// Join 
// Dosen't change the original array
console.log(letters.join(' - '));//Output:a - b - c - d - e - f - g - h - i - j
console.log(letters);

const arr3 = [23,11,64];
console.log(arr3[0]);
console.log(arr3.at(0));

// Getting last array element
console.log(arr3[arr.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

// Working also on strings
console.log('Max'.at(0));
console.log('Max'.at(-1));



//-------------------------------------------------------------------------------

// ForEach
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// Same as above
movements.forEach((movement) => {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
})

// The difference between forEach and for of loop is that we can't break the loop in the middle
// Using the forEach. another difference is the index position in the parameters
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})



// Map
// We will use the currencies map
// We can loop on maps
currencies.forEach((value,key, map) => {
  console.log(`${key}: ${value}`);
})

// Set
const currenciesUnique = new Set(['USD','GBP','USD','EUR','EUR']);
console.log(currenciesUnique);
// Set don't return index
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}`);
})

//--------------------------------------------------------------------------------------------------



// Working With Arrays

// Coding Challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
// about their dog's age, and stored the data into an array (one array for each). For 
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have 
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
// ages from that copied array (because it's a bad practice to mutate function 
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
// �
// ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far �
// GOOD LUCK �

const arrJolia1 = [3, 5, 2, 12, 7];
const arrKate1 = [4, 1, 15, 8, 3];

const arrJolia2 = [9, 16, 6, 8, 3];
const arrKate2 = [10, 5, 6, 1, 4];

const arrJoliaFixed1 = arrJolia1.slice(1,-2);
const arrJoliaFixed2 = arrJolia2.slice(1,-2);

const checkDogs = (arr1,arr2) => {
  const dogs = arr1.concat(arr2);
  dogs.forEach((age,i) => {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  })
}

const joinedArr1 = checkDogs(arrJoliaFixed1,arrKate2);
console.log('---------------------------------------------------------------');
const joinedArr2 = checkDogs(arrJoliaFixed2,arrKate2);


//------------------------------------------------------------------------------------


// map method
const eurToUsd = 1.1;

// Return new array with new elements
const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));

console.log(movements);
console.log(movementsUSD);

// Will return new array with movments
const movementsDescriptions = movements.map((mov,i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`
);

console.log(movementsDescriptions);



// Maximum value
const max = movements.reduce((acc,mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(max);



//---------------------------------------------------------------------------------------------

// Coding Challenges #2/#3
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is 
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as 
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know 
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK �



const calcAverageHumanAge = (dogs) => {
  console.log(dogs); 
  const humanAges = dogs
  .map((dogAge) => dogAge <= 2 ? 2 * dogAge: 16 + dogAge * 4)
  .filter((dogAge) => dogAge >= 18); 

  const humanAgesAverage = humanAges
    .reduce((acc,age,i,arr) => acc + age / arr.length, 0 )
  console.log(humanAges);
  console.log(humanAgesAverage);
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);


//----------------------------------------------------------------------

// Reduce method

const eurToUsd = 1.1;
// Chainining methods
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc,mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// Find method

// The find method will return the first element with the specified condition
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

// Will return the first object with owner named Jessica Davis
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);
console.log(accounts);

//----------------------------------------------------------------------------

// Some method
// Return false or true if at least one element fulfil the condition
const anyDeposits = movements.some(mov => mov > 500);
console.log(anyDeposits);

// Every method
// Return false or true if all elements fulfil the condition
console.log(movements.every(mov => mov > -5000));

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));



//------------------------------------------------------------------------------

//2019: Flat method returns new big array instead  combined arrays
// Default is one level deep
const arr4 = [[1,2,3],[4,5,6],7,8];
console.log(arr4.flat());

// Here we go 2 levels deep
const arrDeep = [[1,2,3],[4,5,[5,6]],7,8];
console.log(arrDeep.flat(2));

// flat
//Here we will calculate the overal balance in the bank with 3 steps
// a) here we will return new array with all movements
const accountsMovements = accounts.map(acc => acc.movements);
console.log(accountsMovements);

// b) here we will flat all movements at the same level
const allMovements = accountsMovements.flat();
console.log(allMovements);

// c) here we combine all movements to one value
const overalBalance = allMovements.reduce((acc,mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap

// Here we will do the same as above using chaining and flatMap instead of map and flat
// flat map goes only one level deep and it can't be changed
const overalBalanceNew = accounts.flatMap(acc => acc.movements )
  .reduce((acc, mov) => acc + mov, 0)

console.log(overalBalanceNew);

// Sort
// sorts by alfabet and it changes the original array
const owners = ['Jonas','Zach','Adam','Martha'];
console.log(owners.sort());
console.log(owners);

//Here we will sort the numbers ascending order
console.log(movements);
movements.sort((a,b) =>  a < b ? -1 : 1);
// Same as above
movements.sort((a,b) => a - b);
console.log(movements);

// Descending order
movements.sort((a,b) => b - a);
console.log(movements);

*/




