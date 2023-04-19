'use strict';

// Data needed for first part of the section
//This is called destructuring array with means creating new variables based on array data
const arr = [2,3,4];
const [a,b,c] = arr;
console.log(a,b,c);

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    
  },
  //2.Here we will destructure the object
  //The arguments and the parameters  doesn't have to be in the same order
  // Output:"Order received! Garlic Bread and Risotto will be delivered to Via de sole, 21 at 22:30"
  orderDelivery: function ({starterIndex, mainIndex, time, address}) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} `);
  },
  orderPasta: function(arg1,arg2,arg3) {
    console.log(`Here is your delicious pasta with ${arg1}, ${arg2} and ${arg3}`);

  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

//----------------------------------------------------------------------------------------------------------
//Part 1
//----------------------------------------------------------------------------------------------------------
/*
//1.Here we call the method and we pass an object
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via de sole, 21',
  mainIndex: 2,
  starterIndex: 2
})

let [main, , secondary] = restaurant.categories;
//Will print the first and the third elements in the categories array.we live a hole if we want to skip an element
console.log(main,secondary);

//If we want to switch places we can do it that way
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return valus from a function
const [starter, mainCourse] = restaurant.order(2,0);
console.log(starter, mainCourse);

// Destructuring inside Destructuring with a hole in the middle
const nested = [2,4,[5,6]];
const [e, ,[t,k]] = nested;
console.log(e,t,k);// Will print: 2 5 6

// Default values 
const [p = 1, q = 1, r = 1] = [8,9];
//Will print : 8 9 1 that happens because the array dosn't have a third index so we get the default value
console.log(p,q,r);

//------------------------------------------------------------------------------

// Desructuring Objects
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories); 


// Desructuring Objects and give the variables new names
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant
console.log(restaurantName,hours,tags);

// Desructuring Objects and give the variable new name and set a default value
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu,starters);

// Mutating variables 
let a1 = 111;
let b1 = 999;
const obj = {a1: 23, b1:7,c1:14};
({a1,b1} = obj);
console.log(a1,b1);

// Nested objects
const {fri: {open, close}} = openingHours;
console.log(open, close);


//--------------------------------------------------------------------------------------

// Spread operator
const array = [7,8,9];
//Will combine 2 arrays
const newArray = [1,2,...array];
console.log(newArray);//Output: [1,2,7,8,9];
console.log(...newArray);//Output: 1,2,7,8,9;

//Here we will create new array from the object and will add new element to the original element
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Shallow copy array(similar to assign in objects)
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menuC = [...restaurant.mainMenu,...restaurant.starterMenu];
console.log(menuC);

//Iterables: arrays, strings, maps,sets. Not objects
const str = 'Max';
const letters = [...str,'','S.'];
console.log(letters);//Output: ['M','a','x','','s.']
console.log(...str);//Output: M a x

//Here we create an array of prompts
// const ingredients = [
//   prompt("let's make past! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 3?"),
// ];

// Here we create array of ingredients and send them to the method 
// restaurant.orderPasta(...ingredients);

//Objects
//Here we create new object with old properties with 2 new properties
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

// Object copy
const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
//Will print different names
console.log(restaurantCopy.name);
console.log(restaurant.name);



//-------------------------------------------------------------------------------------

//1)Desructuring

//Spread, because on right side of =
const arr1 = [1,2,...[3,4]];

//Rest, because on Left side of =
//It creates new variables with part of the array
const [aa,bb, ...others] = [1,2,3,4,5];
console.log(a,b,others);//Output: 1,2 [3,4,5];

//The rest element must be the last element and only one
const [pizza,,risotto, ...otherFood] = [...restaurant.mainMenu,...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);//Output: Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'];

//Objects
//This will leave only the rest of the properties
const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);//Will print only friday and thursday 

//2) Functions
const add = function(...numbers) {
  let sum = 0;
  for(let i = 0; i < numbers.length;i++)sum += numbers[i];
  console.log(numbers,sum);
}

add(2,3);//Output:[2, 3] and 5
add(5,3,7,2);//Output:[5, 3, 7, 2] and 17
add(8,2,5,3,2,1,4);//Output:[8, 2, 5, 3, 2, 1, 4] and 25

//This will give the same result as above
const x = [23,5,7];
add(...x);

//Here we call a method and the first element will be the mainIngredient and all the others will be an array
restaurant.orderPizza('mushrooms','onion','olives','spinach');

//Summery in the end of lecture 106


//-------------------------------------------------------------------------

//Short circuiting with ||

//Important thing to remember if restaurant.numGuests = 0 guests1 will be false and we will recieve 10 instead
restaurant.numGuests = 0;
//If we restaurant.numGuests is defined then guests1 will get restaurant.numGuests value if not it will be 10
const guests1 = restaurant.numGuests || 10;
console.log(guests1);

//Short circuiting with &&
// the and operator is the opposite of the or operator and will return the first falsy value
//If restaurant.orderPizza doesn't exists then v value will be undefined
const v = restaurant.orderPizza && restaurant.orderPizza('mushrooms','spinach');
console.log(v);

// Nullish: null and undefined (Not 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
//Now we can see that the console print 0
console.log(guestCorrect);

const rest1 = {
  name: 'Capri',
  numGuests: 0
}

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi'
}

//Or assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
//Same as above
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//This will print the currect number even if it's 0
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

console.log(rest1.numGuests);//Output: 20   because rest1.numGuests is defined
console.log(rest2.numGuests);//Output: 10   because rest2.numGuests is undefined

//Nullish assignment operator (null or undefined)
// rest1.owner = rest1.owner &&  '<ANONYMOUS>';
// rest2.owner = rest2.owner &&  '<ANONYMOUS>';

//This will solve the undefined value.If the property doesn't exists then we won't see propery with undefined
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);

//-------------------------------------------------------------------------------------

// Coding Challenge #1
// We're building a football betting app (soccer for my American friends �)!
// Suppose we get data from a web service about a certain game ('game' variable on 
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and 
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field 
// players. For Bayern Munich (team 1) create one variable ('gk') with the 
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a 
// new array ('players1Final') containing all the original team1 players plus 
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player 
// names (not an array) and prints each of them to the console, along with the 
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which 
// team is more likely to win, without using an if/else statement or the ternary 
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
// Then, call the function again with players from game.scored
// GOOD LUCK �

*/



const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
  [
  'Neuer',
  'Pavard',
  'Martinez',
  'Alaba',
  'Davies',
  'Kimmich',
  'Goretzka',
  'Coman',
  'Muller',
  'Gnarby',
  'Lewandowski',
  ],
  [
  'Burki',
  'Schulz',
  'Hummels',
  'Akanji',
  'Hakimi',
  'Weigl',
  'Witsel',
  'Hazard',
  'Brandt',
  'Sancho',
  'Gotze',
  ],
  ],
  score: '4:0',
  scored: ['Lewandowski','Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
  team1: 1.33,
  x: 3.25,
  team2: 6.5,
  },
  printGoals: function(...players) {
    console.log(`${players.length} goals were scored`);
    for(let i = 0;i < players.length;i++) console.log(this.scored[i]);
  }
  };

  /*
  // 1)
  const [players1,players2] = game.players
  console.log(players1);
  console.log(players2);

  // 2)
  const [gk,...fieldPlayers] = players1;
  console.log(gk,fieldPlayers);

  // 3)
  const allPlayers = [...players1,...players2];
  console.log(allPlayers);

  // 4)
  const players1Final = ['Thiago','Coutinho','Perisic',...players1];
  console.log(players1Final);

  // 5)
  const {team1,x:draw,team2} = game.odds;
  console.log(team1,draw,team2);

  // 6)

  game.printGoals('Davies','Muller','Lewandowski','Kimmich');
  game.printGoals('Davies','Muller');
  game.printGoals(...game.scored);

  // 7) 

  game.odds.team1 < game.odds.team2 && console.log('Team 2 is more likely to win');

  game.odds.team1 > game.odds.team2 && console.log('Team 1 is more likely to win');
  

  //----------------------------------------------------------------------------------------------------------
//Part 2
//----------------------------------------------------------------------------------------------------------



// For-of loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

console.log('----------------------------------');

for (const item of menu.entries()) console.log(`${item[0] + 1}: ${item[1]}`);

console.log('----------------------------------');
// Same output as above
for (const [i, el] of menu.entries()) console.log(`${i + 1}: ${el}`);

//-----------------------------------------------------------------------
// Enhanced Object Literals
const obj = {
  a: 1,
  b: 2,
  c: 3
}

const objBig = {
  d: '4',
  // obj:obj,
  //We can use that instead of the line above
  obj,
  numbers: [1,2,3],
  // sum: function() {
  //   let sum = 0
  //   for (let i = 0;i < this.numbers.length;i++)sum += this.numbers[i];
  //   console.log(sum);
  // }
  //This is same as above
  sum() {
    let sum = 0
    for (let i = 0;i < this.numbers.length;i++)sum += this.numbers[i];
    console.log(sum);
  }
}

console.log(objBig);

objBig.sum();

//-----------------------------------------------------------------------------------------

*/

/*

// Property names
const properties = Object.keys(restaurant.openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);//Output:We are open on 3 days: thu, fri, sat, 

// Property names
const values = Object.values(restaurant.openingHours);
console.log(values);

// Entries object
const entries = Object.entries(restaurant.openingHours);
//console.log(entries);//Will print array of arrays containes keys and values

for(const x of entries) {
  console.log(x);//Will print array of key and value
}
// [key, value]
for(const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);//example output:On thu we open at 12 and close at 22
}


//-------------------------------------------------------------------------------------------------------------

// Coding Challenge #2
// Let's continue with our football betting app! Keep using the 'game' variable from 
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console, 
// along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already 
// studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them 
// (except for "draw"). Hint: Note how the odds and the game objects have the 
// same property names �
// 4. Bonus: Create an object called 'scorers' which contains the names of the 
// players who scored as properties, and the number of goals as the value. In this 
// game, it will look like this:
// {
//  Gnarby: 1,
//  Hummels: 1,
//  Lewandowski: 2
// }
// GOOD LUCK �



//1)
//Solution A
const players1 = Object.entries(game.scored);

for (const player of players1){
  console.log(`Goul ${players1.indexOf(player) + 1}: ${player[1]}`); ;
};
//Solution B
const players2 = game.scored.entries();
for (const [i, player] of players2) console.log(`Goul ${i + 1}: ${player}`);

//2)
//Solution A
const odds1 = Object.entries(game.odds);

let averageOdds1 = 0;

for (const [key,value] of odds1) averageOdds1 += value;
console.log(averageOdds1 / odds1.length);

//Solution B
const odds2 = Object.values(game.odds);

let averageOdds2 = 0;

for (const odd of odds2) averageOdds2 += odd;
averageOdds2 /= odds2.length;
console.log(averageOdds2);

//3)
//Solution A
for (const [,value] of odds1){
  if(value === game.odds.team1) console.log(`Odd of victory ${game.team1}:${value} `);
  if(value === game.odds.x) console.log(`Odd of draw :${value}`);
  if(value === game.odds.team2) console.log(`Odd of victory ${game.team2}:${value} `);
} 
//Solution B
for(const [team, odd] of Object.entries(game.odds)){
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

//4)
//Solution A

const scorers1 = {}
for (const value of Object.values(game.scored)) scorers1[value] ? scorers1[value]++ : scorers1[value] = 1;

//Solution B
const scorers2 = {};
for (const player of game.scored) {
  scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1);
}


console.log(scorers1);
console.log(scorers2);

//--------------------------------------------------------------------------------------------------------------

//Part 3




//Sets Lecture:116
//Sets are similar to arrays but they don't allow duplicates
const orderSet = new Set(['Pasta','Pizza','Pizza','Risotto','Pasta','Pizza']);

console.log(orderSet);//Output: Set(3) {'Pasta', 'Pizza', 'Risotto'}

//Set can iterate on strings like in array
console.log(new Set('Max'));
//We can see how many elements we have in a set
console.log(orderSet.size);
//Has method will return true if an element exists in the set
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));
//We can add elements
orderSet.add('Garlic Bread');
//We can delete elements
orderSet.delete('Risotto');
console.log(orderSet);

for (const order of orderSet) console.log(order);//Output:Garlic Bread
//We can remove all elements from a set
orderSet.clear();
console.log(orderSet);
//We can't retrive an index from a set

//Example
//If we want to create set from array we can do this:
const staff = ['Waiter','Chef','Waiter','Manager','Chef','Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);//Output:(3) ['Waiter', 'Chef', 'Manager'];

//If we just want to see how many unique elements we have in array we can use that example
console.log(new Set(['Waiter','Chef','Waiter','Manager','Chef','Waiter']).size);//Output:3

//-------------------------------------------------------------------------------------------------

//Maps

const rest = new Map();
//We can add elements to the map
rest.set('name','Classico Italiano');
rest.set(1,'Firenze,Italy');
rest.set(2,'Lisbon,Portugal');
console.log(rest);//Output: {'name' => 'Classico Italiano', 1 => 'Firenze,Italy', 2 => 'Lisbon,Portugal'};

rest.set('Categories',['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open',11)
.set('close',23)
.set(true,'We are open :D')
.set(false,'We are closed :(');

//We can use the get method to get the values
console.log(rest.get('name'));//Output: Classico Italiano
console.log(rest.get(true));//Output: We are open :D
console.log(rest.get(1));//Output: Firenze,Italy

//Example
const time = 8;
//Here we want to check if the restaurant is open and if it is we will get the value
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));//Output: We are closed :(
  
  console.log(rest.has('Categories'));//Output: true
  rest.delete(2);//here we delete the second location
  console.log(rest);
  console.log(rest.size);//Output: 7
  
  //If we want to set array as a key we will have to do it that way because if we will use [1,2] 
  //it won't be the same array in the memory
  const array = [1,2];
  rest.set(arr, 'Test');
  console.log(rest.get(arr));
  
rest.clear();//We can delete all elements
console.log(rest);

//Here we convert array to an object
const hour = {...restaurant.openingHours};
console.log(hour);

//Here we convert object to map
const hourMap = new Map(Object.entries(restaurant.openingHours));
console.log(hourMap);

// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

//Here we want to create a small app that asks the user in the console a question if the answer is correct 
//It will print 'Correct' else 'Try again!'
console.log(question.get('question'));
for (const [key,value] of question) {
  if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
// const answer = Number(prompt('Your answer'));
// console.log(question.get(answer));

//
//Solution A
// console.log(answer === question.get('correct') ? question.get(true): question.get(false));

//Solution B
console.log(question.get(question.get('correct') === answer));

//----------------------------------------------------------------------------------------------



// Coding Challenge #3
// Let's continue with our football betting app! This time, we have a map called 
// 'gameEvents' (see below) with a log of the events that happened during the 
// game. The values are the events themselves, and the keys are the minutes in which 
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no 
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on 
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking 
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
// GOOD LUCK �

const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow card'],
]);

//1)
//Solution A
const events1 = [...new Set(['GOAL','Substitution', 'GOAL','Substitution','Yellow card','Red card','Substitution'
,'Substitution','GOAL','GOAL','Yellow card'])];
console.log(events1);

//Solution B
const events2 = [...new Set(gameEvents.values())];
console.log(events2);

//2)
gameEvents.delete(64)
console.log(gameEvents);

//3)
//Solution A
console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

//If we want to be accurate we can display the actual duration of the game
//Solution B
const time1 = [...gameEvents.keys()];
console.log(`An event happened, on average, every ${time1[time1.length - 1] / gameEvents.size} minutes`);

//Solution C
const time2 = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time2 / gameEvents.size} minutes`);
//4)
for (const [key,event] of gameEvents) console.log( key < 45 ?`[FIRST HALF] ${key}: ${event}`: `[Second HALF] ${key}: ${event}`);


//------------------------------------------------------------------------------------------

*/

//Part 4

//Strings

const airline = 'Tap Air Portugal';
const plane = 'A320';

console.log(plane[0]);//Output: A
console.log('B737'[0]);//Output: B
console.log(airline.length);//Output: 16
console.log('B737'.length);//Output: 4


console.log(airline.indexOf('r'));//Output: 6
//This will show the index of the letter
console.log(airline.lastIndexOf('r'));//Output:10

//This will show the index where the word begins
console.log(airline.indexOf('Portugal'));//Output:8

//It doesn't change the original string
console.log(airline.slice(4));//Output:Air Portugal

//Here we start at position 5 and end at position 7
console.log(airline.slice(4,7));//Output:Air

//Here we get the first word
console.log(airline.slice(0, airline.indexOf(' ')));//Output:Tap

//Here we get the last word the + 1 is for canceling the space before the word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));//Output:Portugal

//Here we get the last 2 letters
console.log(airline.slice(-2));//Output:al

//Here we cut one letter from the start and one from the end 
console.log(airline.slice(1,-1));//Output:ap Air Portuga

//Example
const checkMiddleSeat = function(seat) {
  //B and E are middle seats
  const s = seat.slice(-1) === 'B' || seat.slice(-1) === 'E' ? 'You got the middle seat 🙄' : 'You got lucky 😎'
  console.log(s);
}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());//Output:tap air portugal
console.log(airline.toUpperCase());//Output:TAP AIR PORTUGAL

//Fix capitalization in name
//We will lowecase the entire name and then combine the first uppercase latter with the rest lower case part
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passangerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passangerCorrect);

//Comparing emails
//We have the email and the email the user typed to login
const email = 'hello@jonas.io';
const loginEmail = 'Hello@jonas.Io \n';

//First we will lowercase the email and then we will remove spaces
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

//Same as above
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(email === normalizedEmail,normalizedEmail);



// Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£','$').replace(',','.');
console.log(priceUS);//Output: 288.97$

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
//Solution A
console.log(announcement.replaceAll('door','gate'));//This will replace all doors with gates
//Solution B
console.log(announcement.replace(/door/g,'gate'));//This will replace all doors with gates

const plane1 = 'Airbus A320neo';
console.log(plane.includes('A320'));//true
console.log(plane.startsWith('Air'));//false

if(plane1.startsWith('Airbus') && plane1.endsWith('neo')) console.log('Part of the new airbus family');
//Output:Part of the new airbus family

// Practice exercise
//Here we will build a function that will check if the pessenger has a gun or knife and will print message accordingly
//First we will lowercase the string and then we will check if the string includes the words
const checkBaggage = function(items) {
  const baggage = items.toLowerCase();
  if(baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
}
checkBaggage('I have laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');




