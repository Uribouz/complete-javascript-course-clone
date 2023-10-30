'use strict';
//Destructuring Values from arrays 

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
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
  }
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIdx: 2,
  starterIdx: 2,
});

//Default value
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIdx: 3,
});

//Normal way to destructuring object
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

//Renaming value
const {
  name: restaurantName, 
  openingHours: hours, 
  categories: tags
} = restaurant;

//Default Value
console.log(restaurantName, hours, tags);
const { menu = [], starterMenu: starters = []} = restaurant;
console.log('Menu starters: ',menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};

({a, b} = obj);
console.log('Mutate a, b: ', a,b);

//Nested Objects
const { 
  fri: {open: o, close: c}
} = openingHours;
console.log('Open-Close: ', o, c);