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

// Object.freeze makes the object immutable(can't add new property)
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// This is not going to work
// spendingLimits.jay = 500;
console.log(spendingLimits);

const getLimit = (limits,user) => limits?.[user] ? spendingLimits[user] : 0;

// Pure function
const addExpense = function (state,limits,value, description, user = 'jonas') {

  const cleanUser = user.toLowerCase();

  //Here we return new copy
  return value <= getLimit(limits,cleanUser) ? [...state,{ value: -value, description, user: cleanUser}] : state;

};
const newBudget1 = addExpense(budget,spendingLimits,10, 'Pizza 🍕');
const newBudget2 = addExpense(newBudget1,spendingLimits,100, 'Going to movies 🍿', 'Matilda');
const newBudget3 = addExpense(newBudget2,spendingLimits,200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);

const checkExpenses = (state,limits) => {
  return state.map(entry => {
    return entry.value < -getLimit(limits,entry.user) ? {...entry,flag: 'limit'} :entry;
  })
};
const finalBudget = checkExpenses(newBudget3,spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state,bigLimit) {
  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join(' / ');

  console.log(bigExpenses);
};
console.log(budget);
logBigExpenses(finalBudget,500)
