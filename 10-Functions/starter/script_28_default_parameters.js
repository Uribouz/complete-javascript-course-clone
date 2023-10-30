'use strict';

const bookings = [];

const createBooking = function(flightNum,
     numPassengers = 1,
     price = 199  * numPassengers) {
    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;


    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');

createBooking('LH234', 2, 800);

//Using default parameters in calculations
createBooking('LH456', 2);

//Skip middle default parameters
createBooking('LH789', undefined, 1000);