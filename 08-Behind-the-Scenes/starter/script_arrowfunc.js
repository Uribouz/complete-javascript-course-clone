'use strict';


const ball = {
    firstName: 'Bal',
    year: 1994,
    calcAge: function() {
        //get this from 'ball' object
        console.log(this);
        console.log(2037 - this.year);

        //Solution 1: before ES6
        // const self = this;
        // //Regular function call set 'this' keyword to undefined
        // const isMillenial = function() {
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // };

        //Arrow function use this keyword from its parent scope.
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
        };

        isMillenial();
    },
    //This keyword is 'Windows object'
    greet: () => console.log(`Hey ${this.firstName}`),
}
ball.calcAge();
ball.greet();
console.log(this.firstName);

//Never use arrow function as a method


//arguments keywords working on normal function
const addExpr = function( a, b) {
    console.log(arguments);
    return a + b;
}

addExpr(2, 5);
addExpr(2,5,8,12);

//arguments keywords not working on arrow function
var addArrow = (a, b) => {
    console.log(arguments);
    return a + b;
};
addArrow(2,5,8);