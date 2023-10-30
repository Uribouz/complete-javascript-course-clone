'use strict';

function calcAge(birthYear) {
    const age = 2037 - birthYear;

    function printAge() {
        let output = `${firstName}, You are ${age}, born in ${birthYear}`
        console.log(output);

        if (birthYear >= 1981) {
            const firstName = 'Big';
            const str = `Oh you are a millenial, ${firstName}`
            console.log(str);

            //Reassigning outer scope's variable
            output = 'NEW OUTPUT!';
        }
        console.log(output);
    }
    printAge();
    return age;
}

const firstName = 'Ball';
calcAge(1991);