const tipLower = 15/100;
const tipHigher = 20/100;


function getTip( bill) {
    let tipCal = bill >= 50 && bill <= 300 ? tipLower : tipHigher;
    return tipCal * bill;
}


bill = 430;
tip = getTip(bill);
console.log(`Bill: ${bill}, Tip: ${tip}, Total: ${bill + tip}`);
//316.25
//48
//516
