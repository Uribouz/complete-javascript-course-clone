'use strict';

const rest1 = {
    name: 'Capri',
    // numGuests: 20,
    numGuests: 0,
};

const rest2 = {
    name: 'La Piazza',
    owner: 'Giovanni Rossi',
};


//OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

//Better
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

//Best
// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1)
console.log(rest2)
