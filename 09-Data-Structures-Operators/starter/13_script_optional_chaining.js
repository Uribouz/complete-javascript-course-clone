'use strict';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat','Sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
//   [`${weekdays[5]}urday`]: {
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
  
    //ES6 enhanced object literals
    openingHours,

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


//Hard to read
if (restaurant.openingHours && restaurant.openingHours.mon) {
console.log(restaurant.openingHours.mon.open);
}

//Optional chaning (?.)
console.log(restaurant.openingHours?.mon?.open);

  
const days = ['Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat','Sun'];
for (const day of days) {
    // console.log(day);
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}

//Methods 
console.log(restaurant.order?.(0,1) ?? 'Method does not exists');
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method risotto does not exists');

// const users = [{name: 'Ball', email: 'ball@io.com'}];
const users = [];


if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

//Better
console.log(users[0]?.name ?? 'User array empty');