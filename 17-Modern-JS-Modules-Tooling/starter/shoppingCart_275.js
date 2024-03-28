// Exporting Module.
console.log('Exporting Module');

// console.log('A.Start fetching users');
// await fetch('http://jsonplaceholder.typicode.com/users');
// console.log('B.End fetching users');


const shippingCost = 10;
export const cart = [];
// console.log(shippingCost);

export const addToCart = function (product, quantity) {
    cart.push( {product, quantity});
    console.log(`${product} ${quantity} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;
export {totalPrice, totalQuantity as qt};

//* Copy from 'addToCart'
export default function (product, quantity) {
    cart.push( {product, quantity});
    console.log(`${product} ${quantity} added to cart`);
}