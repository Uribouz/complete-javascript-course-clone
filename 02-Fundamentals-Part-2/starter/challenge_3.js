'use strict';

const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: '78',
    height: '1.69',
    calBMI: function() { 
        this.BMI = this.weight / (this.height * this.height);
        console.log('mark BMI: ' + this.BMI);
        return this.BMI;
     }
}

const john = {
    firstName: 'John',
    lastName: 'Smith',
    weight: '92',
    height: '1.95',
    calBMI: function() { 
        this.BMI = this.weight / (this.height * this.height);
        console.log('john BMI: ' + this.BMI);
        return this.BMI;
     }
}


function logBMI(firstPerson, nextPerson) { 
   console.log(`${firstPerson['firstName']} ${firstPerson['lastName']}'s BMI (${firstPerson['BMI'].toFixed(1)}) 
is higher than ${nextPerson['firstName']}'s (${nextPerson['BMI'].toFixed(1)})!`);
}

if (mark.calBMI() > john.calBMI()) {
    logBMI(mark, john);
} else if (mark.BMI < john.BMI) {
    logBMI(john, mark);
}