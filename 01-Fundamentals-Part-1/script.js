
const bill = 430;

const tip = (50 < bill && bill < 300) ? 0.15 * bill : 0.2 * bill;

console.log(`The bill was ${bill}$, the tip was ${tip}$, and total bill was ${tip + bill}$`);
