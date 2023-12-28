'use strict';

const Person = function(firstName, birthYear) {
    console.log(this);
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never do this, can cause performance issues
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // }
}

const ball = new Person('Ball', 1991);
/* 4 Steps happens

    1. New {} is created
    2. function is called, this = {}
    3. {} is linked to prototype
    4. function automatically return {}
*/
console.log(ball);


const mailda = new Person('Matilda', 1994);
const jack = new Person('Jack', 1975);
console.log(mailda, jack);

console.log(ball instanceof Person);


//209: Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}
// every object can access methods of its own prototype.
ball.calcAge();
mailda.calcAge();

console.log(ball.__proto__);

console.log(ball.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(ball));
console.log(Person.prototype.isPrototypeOf(mailda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapins';
console.log(ball.species, mailda.species);
console.log(ball.hasOwnProperty('firstName'));
console.log(ball.hasOwnProperty('species'));

/*
* ball didn't have property 'species' as its own,
* but ball can access property 'species' from its prototype. 
*/