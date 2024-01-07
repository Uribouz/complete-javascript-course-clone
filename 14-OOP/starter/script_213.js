'use strict';

//Constructor function
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

/*
* property '__proto__' under an object is 'pointed' to its prototype
* so create a method on prototype is always efficient 
* more than create a method on the object itself..
*/

/*
* The prototype of the 'Person.prototype' is 'Object.prototype'
* the prototype of the 'Object.prototype' is null.
* note: "{}"" is a short-hand for "new Object()""
*/

/*
* Prototype chain start from the instance of object itself down to the 'Object.prototype'
* ex: ball.hasOwnProperty('name');f
*    'hasOwnProperty' is a method from 'Object', but you can access it from the 
* instance of 'ball'object  it self, because of the work of "Prototype Chain".
*/ 


console.log(ball.__proto__);
// Object.prototype (top of prototype chain)
console.log(ball.__proto__.__proto__);
console.log(ball.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor)


const arr = [3,6,4,6,9,5,6,9,3]; // new Array === []
console.log(arr.__proto__)

console.log(arr.__proto__ === Array.prototype)
console.log(arr.__proto__.__proto__)


/* Should not do it like this in real life...
/* Never create new method on a primitive type.
*/
Array.prototype.unique = function () {
    return [...new Set(this)];
}
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);

//Function's prototype is the 'Object'
console.dir(x => x+1);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. 
The speed property is the current speed of the car in km/h;

2. Implement an 'accelerate' method that will increase the car's speed by 10, 
and log the new speed to the console;

3. Implement a 'brake' method that will decrease the car's speed by 5, 
and log the new speed to the console;

4. Create 2 car objects and experiment with calling 'accelerate' and 'brake'
 multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/


const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
    this.speedUnit = 'km/h';
}
Car.prototype.accelerate = function() {
    this.speed = this.speed + 10;
    console.log(`${this.make} is going at ${this.speed} ${this.speedUnit}`);
}
Car.prototype.brake = function() {
    this.speed = this.speed - 5;
    console.log(`${this.make} is going at ${this.speed} ${this.speedUnit}`);
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate()
mercedes.accelerate()
bmw.accelerate()
mercedes.accelerate()
bmw.brake()
mercedes.brake()


// 213

// CLASS EXPRESSION
const PersonCl1 = class {

}

//  CLASS DECLARATION
class PersonCl {
    constructor( firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // Methods will be added to .prototype properties
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greetV2() {
        console.log(`Hey ${this.firstName}`);
    }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica)
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function () {
    console.log(`Hey ${this.firstName}`);
}
jessica.greet();
jessica.greetV2();

// Notes:
// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode
