
/* Chapter 271 
* Development
* -> MODULES & "3rd Party Packages" (npm)
* Build Process
* -> BUNDLING (join all modules into one file)
* -> TRANSPILING/POLYFILLING "BABEL" (convert modern JavaScript back to ES5)
* Production
* -> Javascript BUNDLE
* 
* All of these by using tools "webpack" or "PARCEL" (npm)
* 
* 
*/

//* Chapter 272: Modules
/*
*    Module:
*    - Reusable piece of code that encapsulats implementations detail;
*    - Usually a standalone file, but it doesn't have to be
*    - Benefits:
*        1. Compose Software: Modules are smallbuilding blocks that we put together to build complex applications.
*        2. Isolate components: Modules can be developed in isolation without thingking about the entire codebase.
*        3. Abstract code: Implement low-level code in modules and import these abstractions into other modules.
*        4. Organized code: Modules naturally lead to a more organized codebase
*        5. Reuse Code: Modules allow us to easily reuse the same code, even across multiple projects.
*
    Example:
        import { rand } from './math.js';
        const diceP1 = rand(1,6,2);
        const diceP2 = rand(1,6,2);
        const scores = {diceP1, diceP2}; 
        export {scores};

    - import = Dependency
    - export = Public API
*
*    NATIVE JAVASCRIPT (ES6) MODULES:
*        - Top-Level variables   
*            ES6 MODULE: Scoped to module
*            SCRIPT    : Global
*        - Default Mode:
*            ES6 MODULE: Strict Mode
*            SCRIPT    : Sloppy mode
*        - Top-level `this`
*            ES6 MODULE: undefined
*            SCRIPT    : window
*        - Imports and exports
*            ES6 MODULE: YES
*            SCRIPT    : NO
*        - HTML linking 
*            ES6 MODULE: <script type="module">
*            SCRIPT    : <script>
*        - File downloading
*            ES6 MODULE: Asynchronous
*            SCRIPT    : Synchronous
*
*/

//Chapter 273: Importing and Exporting modules.


//Importing module
console.log('1. Import each values --------------------------------');
import {addToCart, totalPrice as price, qt} from './shoppingCart.js';
console.log('C. Finished Imported');

console.log('Importing module');
// ! Cannot use shippingCost yet, 
// * (because it is not exported)
// console.log(shippingCost);
addToCart('bread', 5);
console.log(`totalPrice: ${price}, totalQuantity: ${qt}`);


console.log('2. Another way to import everything `*`---------------');

import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('rice', 11);
console.log(`totalPrice: ${ShoppingCart.totalPrice}, totalQuantity: ${ShoppingCart.qt}`);

console.log('3. Default import ------------------------------------');

import add from './shoppingCart.js';
add('pizza', 2);


console.log('4. Mixed import ------------------------------------');
//! Never do it like this in real life.

import add2, { addToCart as addToCart2, totalPrice as price2, qt as qt2 } from './shoppingCart.js';
add2('noodles', 22);
addToCart2('more noodles', 33);
console.log(`totalPrice: ${price2}, totalQuantity: ${qt2}`);

// ! NOTE: 
// * Import are not a copy of the exported modules
// * they are a live connection to the exported modules
// * so when you update the value inside the exported module, you are mutating them !!!

import {cart} from './shoppingCart.js';
console.log(cart);

console.log('Before');
const res = await fetch('http://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('After');


const getLastPost = async function() {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    console.log(data);

    return {title: data.at(-1).title, text: data.at(-1).body};
}
const lastPost = getLastPost();
console.log(lastPost);
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);

//Chapter 275: The module pattern
const ShoppingCart2 = (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 123;
    
    const addToCart = function (product, quantity) {
        cart.push( {product, quantity});
        console.log(`${product} ${quantity} added to cart (shipping cost is ${shippingCost})`);
    }

    const orderStock = function (product, quantity) {
        cart.push( {product, quantity});
        console.log(`${product} ${quantity} ordered from supplier`);
    }
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    }
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);