'use strict';
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
  
    order: function (startIdx, mainIdx) {
      return [this.starterMenu[startIdx], this.mainMenu[mainIdx]];
    },
  
    //Destructuring arguments
    orderDelivery: function ({starterIdx = 1, 
      mainIdx = 0, 
      time = '20:00', address}) {
      console.log(
      `Order receive! ${this.starterMenu[starterIdx]}
      and ${this.mainMenu[mainIdx]} 
      will be delivered to ${address} at ${time}
      `);
    },

    orderPizza: function(mainIngredient, ...otherIngredient) {
        console.log(mainIngredient);
        console.log(otherIngredient);
    }
  };
  
// Use ANY data type, return ANY data type,
//short-circuiting
console.log('---- OR ----');
//Return the first truthy value.
//Return last falsey value, if all falsey are truthy.
console.log(3 || 'Ball');

console.log('' || 'Ball');

console.log(true || 0);

console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

console.log('---- AND ----');
//Return the first falsey value.
//Return last truthy value, if all values are truthy.
console.log(0 && 'Ball');
console.log(7 && 'Ball');

console.log('Hello' && 23 && null && 'ball');

if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
}


restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');


console.log('---- Coalescing ----');
//Coalescing operators, 
//only test null and undefined values
restaurant.numGuests = 0;
const guestsCorrect= restaurant.numGuests ?? 10;
console.log(guests1);
