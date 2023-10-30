'use strict';

const flight = 'LH234';
const ball = {
    name: 'Vatca Op',
    passport: 15120321304
}

const checkIn = function(flightNum, passenger) {
    flightNum = 'Lh999';
    passenger.name = 'Mr.' + passenger.name;
    if (passenger.passport === 15120321304) {
        alert('Check in');
    } else {
        alert('Wrong passport');
    }
}

//Primitives didn't change inside function
//Object does change

checkIn(flight, ball);
console.log(flight);
console.log(ball);

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() *1000000000000);
}

newPassport(ball);
checkIn(flight, ball);


//Javascript functions
// are passing by value
// you can modify the value of object inside a function 
// because the value is an address to the heap of such object.