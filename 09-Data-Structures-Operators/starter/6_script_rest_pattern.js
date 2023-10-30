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
  
//Spread operator,
const arr = [1,2, ...[3,4]];

//Rest Operator, because on left side of the =
const [a,b, ...others] = [1,2,3,4,5];
console.log(a,b,others);

const [pizza,  ,risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza,risotto,otherFood);

//Objects
const {sat, ...weekdays} = restaurant.openingHours;
console.log(sat,weekdays);

//2. Functions "Rest"
const add = function(...inputs) {
    let sum = 0;
    console.log(inputs);
    for (let i =0;i < inputs.length;i++) {
        sum += inputs[i];
    }
    console.log(sum);
}

add(2,3);
add(5,3,7,2);
add(8,2,5,3,2,1,4);

const x = [23,5,7];
add(...x)
//Better than array

restaurant.orderPizza('mushroom', 'onion', 'olives','spinach');
restaurant.orderPizza('bacon');