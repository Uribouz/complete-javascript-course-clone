/* CHALLENGE #2
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, telling the user who has the higher BMI. The message can be either:

"Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!".

2. Modify the outputs above to use template literals to include the BMI values in the outputs.

Example: "Mark's BMI (28.3) is higher than John's (23.9)!" or "John's BMI (29.1) is higher than Mark's (27)!".

Note: Don't round the BMI values. Leave them as they are.
*/

function calculateBMI (mass, height) {
    return mass / (height * height);
}

function logUserHigher(firstUserName, firstUserBMI, secondUserName, secondUserBMI) {
    let isFistBMIHigher = (firstUserBMI > secondUserBMI);
    if (isFistBMIHigher) {
        console.log(`${firstUserName}'s BMI (${firstUserBMI}) is higher than ${secondUserName}'s (${secondUserBMI})!`);
    } else {
        console.log(`${secondUserName}'s BMI (${secondUserBMI}) is higher than ${firstUserName}'s (${firstUserBMI})!`);
    }
}

/*
1. Store Mark's and John's mass and height in variables called massMark, heightMark, massJohn and heightJohn.
*/

let massMark = 78, heightMark = 1.69, massJohn = 92, heightJohn = 1.95;

/*
2. Calculate both their BMIs using the formula, and store the results in two variables called BMIMark and BMIJohn.*/
let BMIMark = calculateBMI(massMark, heightMark);
let BMIJohn = calculateBMI(massJohn, heightJohn);

/*
3. Log the value of BMIMark and BMIJohn to the console.
*/
// console.log(BMIMark);
// console.log(BMIJohn);
/*
4. BONUS: Create a boolean variable markHigherBMI containing information about whether Mark has a higher BMI than John. Log it to the console too*/
// let markHigherBMI = (BMIMark > BMIJohn);
// console.log(markHigherBMI);

logUserHigher('John', BMIJohn, 'Mark', BMIMark);