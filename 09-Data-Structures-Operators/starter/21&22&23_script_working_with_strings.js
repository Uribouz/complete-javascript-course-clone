'use strict';

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));


console.log(airline.slice(4));
console.log(airline.slice(4,7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ')+1));

console.log(airline.slice(-2));
console.log(airline.slice(1,-1));


//Check if you have middle-seat or not
const checkMiddleSeat = function(seat) {
    // B and E are middle seats
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E')
        console.log('You got the middle seat 😱')
    else 
        console.log('You got lucky 😎')

}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');


//We can use methods on string primitives type because
//Behind the scenes Javascript convert them to objects String
console.log(new String('Bally'));
console.log(typeof new String('Bally'));
console.log(new String('Bally').slice(1));


//Part 2................................................................

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Correct Name Capitalization
const passenger = 'bAlly';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passenger[0].toUpperCase()+passengerLower.slice(1)
console.log(passengerCorrect)


//Comparing Emails
const email = 'hello@hotmail.io'
const loginEmail = '  Hello@Hotmail.Io \n';

const emailCorrect = loginEmail.toLowerCase().trim();
console.log(emailCorrect)
console.log(email === emailCorrect);


//Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£','$').replace(',','.');;
console.log(priceUS)

const announcement = 'All passengers come to boarding door 23, Boarding door 23!'

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('A320'));
console.log(newPlane.includes('Boeing'));
console.log(newPlane.startsWith('Airb'));

if(newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
    console.log('Part of the New Airbus family');
}

const checkBaggage = function(items) {
    const baggage = items.toLowerCase();
    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('You are not allowed on board');
    }
    else {
        console.log('Welcome aboard')
    }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');


//Part3 ..............................................................................
console.log('a+every+nice+string'.split('+'))
console.log('Ball Op'.split(' '));

//Capitalization
const [firstName, lastName] = 'Ball Op'.split(' ');
console.log(firstName, lastName);
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

//Capitalize first character of array of names
const captalizeName = function(name) {
    const names = name.split(' ');
    const results = [];
    for (const n of names) {
        //Either is fine
        // results.push(n[0].toUpperCase() + n.slice(1));
        results.push(n.replace(n[0],n[0].toUpperCase()));
    }
    console.log(results.join(' '))
}
captalizeName('jessica ann smith davis');
captalizeName('ball vatchar');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30,'+'));
console.log('Ball'.padStart(25,'+').padEnd(30,'+'))

//Mask CreditCard Number
const maskCreditCard = function(number) {
    //Convert number to string
    const str = number + '';
    const last = str.slice(-4);
    console.log(last.padStart(str.length, '*'))
}
maskCreditCard(123510);
maskCreditCard(41235123181921020);
maskCreditCard('41251901283000000');


// Repeat
const messageWeather = 'Bad weather... All Departures Delayed... ';
console.log(messageWeather.repeat(5));

const planesInLine = function(n) {
    console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`)
}
planesInLine(5);
planesInLine(3);
planesInLine(12);