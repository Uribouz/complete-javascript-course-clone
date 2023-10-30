'use strict';
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight ${this.iataCode}${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    }
}

lufthansa.book(239, 'Ball Opas');
lufthansa.book(635, 'Ball Op');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;

//Does not work
// book(23, 'Sarah William');

//#1 Call Method
book.call(eurowings, 23, 'Sarah William');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss',
    iataCode: 'LX',
    bookings: [],
}

book.call(swiss, 583, 'Mary Cooper');
// console.log(swiss);


//#2 Apply Method (Deprecated)
const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

//Use this instead
book.call(swiss, ...flightData)
console.log(swiss);


//#3 Bind Method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Strven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Glen Hawkins');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

// Not work because 'this' keywork in function 'buyPlane' is pointing to the button itself.
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

document.querySelector('.buy').addEventListener('click', 
lufthansa.buyPlane.bind(lufthansa));


// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// #1
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// #2
const addVAT2 = function(value) {
    return addTax(0.23, value);
}
console.log(addVAT2(100));

// #3
const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate
    }
}
const addVAT3 = addTaxRate(0.23);
console.log(addVAT3(100));