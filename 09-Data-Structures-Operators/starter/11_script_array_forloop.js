'use strict';
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order(startIdx, mainIdx) {
      return [this.starterMenu[startIdx], this.mainMenu[mainIdx]];
    },
    //Destructuring arguments
    orderDelivery({starterIdx = 1, 
      mainIdx = 0, 
      time = '20:00', address}) {
      console.log(
      `Order receive! ${this.starterMenu[starterIdx]}
      and ${this.mainMenu[mainIdx]} 
      will be delivered to ${address} at ${time}
      `);
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`);
    }
  };

//Looping Arrays:
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const item of menu.entries()) {
    console.log(`${item[0]+1}: ${item[1]}`);
};

console.log(`Better...`);
for (const [i,el] of menu.entries()) {
    console.log(`${i+1}: ${el}`);
};

// console.log(...menu.entries());