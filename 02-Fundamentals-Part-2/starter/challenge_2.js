'use strict';
const tipLower = 15/100;
const tipHigher = 20/100;

function calTip( bill) {
    let tipCal = bill >= 50 && bill <= 300 ? tipLower : tipHigher;
    return tipCal * bill;
}

const bills = [125, 555, 44];
const tips = [calTip(bills[0]), calTip(bills[1]), calTip(bills[2])];
const totals = [bills[0]+tips[0], bills[1]+tips[1],bills[2]+tips[2]];
console.log(tips);
console.log(totals);