'use strict';
/*
const bookings = [];
//Here we build a function that add objects to the booking array
//We can add default values in the parameters and if we pass values we overwrite them 
const createBooking = function(flightNum,numPassengers = 1,price = 199) {
    //ES5
    //Old way
    // numPassengers = numPassengers || 1;
    // price = price || 199;
    const booking = {
        flightNum,
        numPassengers,
        price
    }
    console.log(booking);

    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123',2,800);
//If we want to skip argument
createBooking('LH123',undefined,800);

//------------------------------------------------------------------

const flight = 'LH234';
const max = {
    name: 'Maxim Lerner',
    passport: 3054848456
}

const checkIn = function(flightNum,passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr.' +passenger.name;

    if(passenger.passport === 3054848456) {
        alert('Checked in')
    } else {
        alert('Wrong passport!')
    }
}

// checkIn(flight, max);
// console.log(flight);
// console.log(max);

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 10000000000)
}

//In that example we will get Wrong passport! because we change the passport number
// newPassport(max);
// checkIn(flight,max);

//-----------------------------------------------------------------------------------

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('Javascript is the best!',upperFirstWord);
//Output 1:Original string: Javascript is the best!
//Output 2:Transformed string: JAVASCRIPT is the best!
//Output 3:Transformed by: upperFirstWord

transformer('Javascript is the best!',oneWord);
//Output 1:Original string: Javascript is the best!
//Output 2:Transformed string: javascriptisthebest!
//Output 3:Transformed by: oneWord

//--------------------------------------------------------------------------------

const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

const greeterHey = greet('Hey');
greeterHey('Max');//Output:Hey Max
greeterHey('Jonas');//Output:Hey Jonas

//We can also do it that way
greet('Hello')('Liza');

//Same as greet function
const greetNew = greeting => name => console.log(`${greeting} ${name}`);

greetNew('Hello')('Mark');

//-------------------------------------------------------------------------

const lufthansa = {
    airline: 'Lufgthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`,name});
    }
};

lufthansa.book(239,'Maxim Lerner');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
}


//now we made a function out of the method
const book = lufthansa.book;

//That function will not work because we used the 'this' to get the airline property
// book(23, 'Sarah Williams');

//Call method

//Instead we will use the call method and pass a first argument that will refere the 'this' to the object 
//we need in that case it's eurowings
book.call(eurowings, 23,'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 23,'Mary Cooper');
console.log(lufthansa);

// Apply method
const flightData = [583, 'George Cooper'];
// Apply method do does the same just that the second argument is an array (not very used)
book.apply(lufthansa, flightData);
console.log(lufthansa);

//Same as above
book.call(lufthansa, ...flightData);

// Bind method
// With the bind method we can create a new function with 'this' keyword
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

//And here we use it like a normal function
bookEW(23,'Steven Williams');
console.log(eurowings);

//This is an example for function that books to specific flight so the flight number is 
//built in using the bind method
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Maxim Lerner');
bookEW23('Marta Cooper');
console.log(eurowings);

// With Events Listeners
lufthansa.planes = 300;
//Here we create a method that adds planes to the stock
lufthansa.buyPlane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}
//We will have to use the bind method in that case because we need the 'this' keyword 
//Without it we will get NAN instead of the number of planes
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//----------------------------------------------------------

// Partial applications
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(200));


const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}

// Same as above just with return functions and without the bind method
const addTaxRate1 = function(rate) {
    return function (value) {
        return value + value * rate;
    }
}

// Same as addTaxRate1 just with arrow function
const addTaxRate2 = rate => value => value + value * rate;

const addVAT2 = addTaxRate1(0.23);
const addVAT3 = addTaxRate2(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));

console.log(addVAT3(100));
console.log(addVAT3(23));

//----------------------------------------------------------------------------------




// Coding Challenge #1
// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an 
// array with the number of replies for each option. This data is stored in the starter 
// 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The 
// method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the 
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For 
// example, if the option is 3, increase the value at position 3 of the array by 
// 1. Make sure to check if the input is a number and if the number makes 
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The 
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using 
// console.log(). This should be the default option. If type is 'string', display a 
// string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 
// 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test 
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll 
// object! So what should the this keyword look like in this situation?

// Test data for bonus:
// § Data 1: [5, 2, 3]
// § Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section �
// GOOD LUCK �

//Solution A
const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),
    //1)
    registerNewAnswer: function(){
        const answer = Number(prompt('// What is your favourite programming language?\n 0: JavaScript\n 1: Python \n 2: Rust\n 3: C++ \n (Write option number)'));
        if (this.options[answer]) {
            console.log('It\'s a valid choise');
            this.answers[answer]++;
            console.log(this.answers);
        } else {
            console.log('Not a valid choise,answer the poll again!');
        }
        //4)
        return this.displayResults();
    },
    //3)
    displayResults: function(type) {
        if(typeof type === 'string') {
            const output = `Poll results are ${type}`;
            console.log(output);
        }
        if(Array.isArray(type)) console.log(type);
    }
 };
 
 poll.displayResults([1,2]);
 // 5)
 poll.displayResults(5, 2, 3)
 
 //2)
 document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
 
 
 
 //Solution B
 const poll2 = {
     question: 'What is your favourite programming language?',
     options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
     // This generates [0, 0, 0, 0]. More in the next section 😃
     answers: new Array(4).fill(0),
     registerNewAnswer() {
         // Get answer
         const answer = Number(
         prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
         console.log(answer);
  
      // Register answer
      typeof answer === 'number' && answer < this.answers.length && this.answers[answer]++;
      
      this.displayResults();
      this.displayResults('string');
    },
  
    displayResults(type = 'array') {
      if (type === 'array') {
        console.log(this.answers);
      } else if (type === 'string') {
        // Poll results are 13, 2, 4, 1
        console.log(`Poll results are ${this.answers.join(', ')}`);
      }
    },
  };
  
  document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
  
  poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
  poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
  poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
  
  // [5, 2, 3]
  // [1, 5, 3, 9, 6, 1]

  */

  //-----------------------------------------------------------------------
//part 2

// IIFE - imediately invoked fuction expressions
// that function is covered by parentheses and the we invoke the function 
// once with another parentheses 

(function (){
    console.log('This function will run only once');
})();

// Same as above just arrow function
(() => console.log('This will ALSO never run again'))();

//-----------------------------------------------------------

//Closures
// Lecture 137
// Example 1
const secureBooking = function () {
    let passengerCount = 0;
    
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();

booker();
booker();
booker();

// If we want to look at passengerCount variable we can use dir method
console.dir(booker);

//-------------------------------------------------------------------

// Example 1
let f;

const g = function(){
    const a = 23;
    f = function() {
        console.log(a * 2);
    }
}

const h = function(){
    const a = 650;
    f = function() {
        console.log(a * 2);
    }
}

// Re-assighning f function
g();
f();
console.dir(f);

h();
f();
console.dir(f);

// Example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    setTimeout(function (){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    },wait * 1000)

    console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

//---------------------------------------------------------------------

// Coding Challenge #2
// This is more of a thinking challenge than a coding challenge �
// Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that 
// changes the color of the selected h1 element ('header') to blue, each time 
// the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself (or someone around you) why this worked! Take all 
// the time you need. Think about when exactly the callback function is executed, 
// and what that means for the variables involved in this example.

(function () {
    const header = document.querySelector('h1')
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', () => {
        header.style.color = 'blue';
    });
})();


