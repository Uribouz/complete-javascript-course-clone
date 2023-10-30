'use strict';


//Windows property itself
console.log(this);


function calcAge(birthYear) {
    const age = 2037 - birthYear;
    console.log(age);

    //undefined
    console.log(this);
};
calcAge(1991);


const calcAgeArrow =  birthYear => {
    const age = 2037 - birthYear;
    console.log(age);

    //get global parent scope
    console.log(this);
};
calcAgeArrow(1991);


const ball = {
    year: 1994,
    calcAge: function() {
        //get this from 'ball' object
        console.log(this);
    }
}
ball.calcAge();

const big = {
    year: 1991,
};

//borrow function form 'ball'
big.calcAge = ball.calcAge;

//Use this keyword that potinted to 'big' object
big.calcAge();

const f = ball.calcAge;
//this is undefined
f();