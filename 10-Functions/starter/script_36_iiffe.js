'use strict';

const runOnce = function() {
    console.log('This will never run again 1');
}
runOnce();

//Immediately Invoked Function Expression
(function() {
    console.log('This will never run again 2');
})();


//Immediately Invoked Function Expression, as arrow function
(
() => console.log('This will never run again 3')
)();

{
    const isPrivate = 23;
    var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);