'use strict';

function calcAge(birthYear) {
    const age = 2037 - birthYear;
    function printAge() {
        const output = `You are ${age}, born in ${birthYear}`
        console.log(output);

        if(birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            const firstName = `Steven`;
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            function add(a,b) {
                return a + b;
            }
        }
        console.log(millenial);
    }
    printAge();

    return age;
}

const firstName = 'Max';
const ageValue = calcAge(1988);
console.log(ageValue);

//----------------------------------------------------------------------
// Hoisting

// Variables 

//console.log(me);//output: undefined
//console.log(job);//output: cannot access 'job' before initialization
//console.log(year);//output: cannot access 'year' before initialization

//var me = 'Jonas';
//let job = 'teacher';
//const year = 1991;

//Functions

console.log(addDeclaration(2, 3));//output: 5
//console.log(addExpression(2,3));//output: Cannot access 'addExpression' before initialization
//console.log(addArrow(2, 3));//output: Cannot access 'addArrow' before initialization
// if used with var output: addExpression is not a function
// if used with var output: addArrow is not a function

function addDeclaration(a,b) {
    return a + b;
}

const addExpression = function (a, b) {
    return a + b;
}

const addArrow = (a, b) => a + b;

// Example
// deleteShoppingCart function will be called because numProducts value is undefined before line 66
console.log(numProducts);
if(!numProducts)  deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!');
}

//-----------------------------------------------------------
// This keyword/variable
console.log(this);//Will print the window object

// In strict mode will print undefined.without strict mode will print window object
function calc() {
    console.log(this);
}
calc();

const calcAgeNew = function (birthYear) {
    console.log(2037 - birthYear);
    //Will print undefined
    console.log(this);
};
calcAgeNew(1991);

const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    //Will print window object because arrow functions don't have it's own this keyword but it will point to the parent
    console.log(this);
};
calcAgeArrow(1981);


const max = {
    year: 1988,
    calcAge: function () {
        //Will print the max object
        console.log(this);
        //Will print the age
        console.log(2037 - this.year);
    }
}

max.calcAge();

const matilda = {
    year: 2017,
}

// This is called method borrowing(copy of a method)
matilda.calcAge = max.calcAge;
//will also print the age
matilda.calcAge();


const f = max.calcAge
//f();//Will give an error because it dosn't have owner with year property

var firstName1 = 'Matilda';

const max1 = {
    firstName1:'Max',
    year: 1988,
    calcAge: function () {
        //Will print the age
        console.log(2037 - this.year);
    },
    greet: () => {
        //Will print Hey metilda because arrow function dosn't have this keyword instead it will go to the global firstname1 var
        console.log(`Hey ${this.firstName1}`);
    }
}
max1.greet();


//--------------------------------------------------------------------------

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
    name: 'Max',
    age: 34
}

const friend = me;
friend.age = 27;
console.log('Friend:',friend);//Will print object of friend. age value will be 27
console.log('Me', me);//Will print object of me. age value will be 27

//Lecture 99
//The reason for that is because when we create me object javscript create address in the call stack
// witch holds reference to the memory address in the heap that holds the value.
// Later we create new object friend it referred to the same address of me object in the call stack witch
// eventually gives us the option to manipulate the property value in the heap






