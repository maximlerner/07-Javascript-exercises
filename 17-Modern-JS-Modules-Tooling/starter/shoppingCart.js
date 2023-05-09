// Exporting module
console.log('Exporting module');

// Blocking code 
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished fetching users');

// Private variables scoped to that module
const shippingCost = 10;
export const cart = [];

// Exporting function
export const addToCart = (product,quantity) => {
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

// We can export with a different name
export {totalPrice as totalPrice1,totalQuantity as totalQuantity1};

export default (product,quantity) => {
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}