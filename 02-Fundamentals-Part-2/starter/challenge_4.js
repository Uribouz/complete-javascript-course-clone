'use strict';
const tipLower = 15/100;
const tipHigher = 20/100;


function calTip( bill) {
    let tipCal = bill >= 50 && bill <= 300 ? tipLower : tipHigher;
    return tipCal * bill;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

for (let i =0; i< bills.length; i++) {
    let tip = calTip(bills[i])
    tips.push(tip);
    totals.push(bills[i] + tip);
}

console.log(`Tips: ${tips}`);
console.log(`Totals: ${totals}`);

function calAverage(arr) {
    let totals = 0;
    for (let i = 0; i < arr.length; i++) {
        totals += arr[i];
    }
    return totals/arr.length;
}


console.log(`Average: ${calAverage(totals)}`);
