'use strict';

//137: Closures

const secureBooking = function() {
    let passengerCount = 0;
    return function() {
        passengerCount++;
        console.log('Passenger count: ' + passengerCount);
    }
}

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

//-- 138: More Closures

//Example: 1
let f;
const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    }
}

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    }
}
//g: assign a function to f
g();
f();
console.dir(f);

//h: re-assign another function to f
h();
f();

console.dir(f);


//Example: 2
// "Callback functions are using Closure"
const boardPassengers = function(n, wait) {
    const perGroup = n / 3; //If not exists, closure will check for Global Variable
    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000)
    console.log(`Will start boarding in ${wait} seconds`);
}

const perGroup = 1000;
boardPassengers(180, 3);