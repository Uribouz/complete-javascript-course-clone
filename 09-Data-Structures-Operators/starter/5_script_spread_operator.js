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
    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`);
    }
  };

const arr = [7,8,9];
const badNewArr = [1,2,arr[0],arr[1],arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

const mainMenuCopy = [...restaurant.mainMenu];

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(menu)

const str = 'Ball';
const letters = [...str, ' ', 'S.'];
console.log(letters)

// const ingredients = [prompt("Let's make pasta! Ingredient 1?"),
// prompt("Ingredient 2?"),
// prompt("Ingredient 3?")];

// restaurant.orderPasta(...ingredients);
/*
*   Spread operator "..."
* Only works on functiona arugment and array.
*/


//Objects
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);