// Importing module
// For making that work we need to add type="module" in the the HTML file
//  shoppingCart file will be executed first

/*
// 1)
import {addToCart,totalPrice1 as price,totalQuantity1 as quantity} from './shoppingCart.js';

console.log('Importing module');

addToCart('bread',5)
console.log(price,quantity);

*/

// 2)
import shoppingCart, * as ShoppingCart from './shoppingCart.js';

ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice1);

// 3)
// import add, {cart} from './shoppingCart.js';

// add('banana', 2);
// add('brrad', 5);
// add('apples', 4);

// console.log(cart);

/*
// Works only in modules with the await 
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Somthing');

*/

const getLastPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return {title: data.at(-1).title, text: data.at(-1).body}
}
const lastPost = getLastPost();

// 1)
// Not very clean
lastPost.then(last => console.log(last))

// 2)
const lastPost2 = await getLastPost();
console.log(lastPost2);


//-------------------------------------------------------------------
// Saving data of IIFE function
const ShoppingCart2 = (() => {
    const cart = [];
    const shippingCost =10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = (product,quantity) => {
        cart.push({product,quantity});
        console.log(`${quantity} ${product} added to cart`);
    }

    const orderStock = (product,quantity) => {
        console.log(`${quantity} ${product} ordered from supplier`);
    };
    return {addToCart,cart,totalPrice,shippingCost}

})()

// We can use a function inside the IIFE
ShoppingCart2.addToCart('apple',4);

// We can see the entire data
console.log(ShoppingCart2);

// We can't access variable we didn't return
console.log(ShoppingCart2.totalQuantity);


//-----------------------------------------------------------------------------

// Export (used in nodejs)
exports.addToCart = (product,quantity) => {
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
}