'use strict';

//-------------------------------------------------------------------------------
console.log('Objects ----------------------');

const ballArray = [
    'ball',
    'opas',
    2037 - 1991,
    'engineer',
    ['John', 'Peter', 'Steven']
]
console.log(ballArray);

const ball = {
    firstName : 'ball',
    lastName: 'Opas',
    age: 2037 - 1991,
    job: 'engineer',
    friends: ['John', 'Peter', 'Steven']
}

console.log(ball);


//-------------------------------------------------------------------------------
console.log('Dot vs Bracket Notation ----------------------');

console.log(ball.lastName)
console.log(ball['lastName'])

const nameKey = 'Name';
console.log(ball['first' + nameKey]);
console.log(ball['last' + nameKey]);

//Not work
// console.log(ball.'last' + nameKey);

const interstedIn = prompt('What do you want to know about Me ? (firstName, lastName, age, job, friends');


if (ball[interstedIn]) {
    console.log(ball[interstedIn]);
} else {
    console.log('Wrong request!')
}

ball.location = 'Englang';
ball['twitter'] = 'http://twitter.com';
console.log(ball);

console.log(`${ball.firstName} has ${ball.friends.length} friends, 
and hist best friend is called ${ball.friends[0]}
`);


//-------------------------------------------------------------------------------
console.log('Objects Methods----------------------');

const ball2 = {
    firstName : 'ball',
    lastName: 'Opas',
    birthYear: 1991,
    job: 'engineer',
    friends: ['John', 'Peter', 'Steven'],
    hasDriverLicense: false,
    calAge: function () {
        // console.log(this);
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        return `${this.firstName} is a ${this.calAge()}-year old ${this.job}, and he has ${this.hasDriverLicense ? 'a':'no'} driver's license`
    }
};


console.log(ball2.calAge());
console.log(ball2.age);
console.log(ball2.age);


console.log(ball2.getSummary()); 