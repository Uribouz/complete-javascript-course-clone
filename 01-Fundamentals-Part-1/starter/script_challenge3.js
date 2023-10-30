let dolphins = [96,108,89]; 
let koalas =  [88,91,110];
// let dolphins = [97,112,101];
// let koalas =  [109,95,123];
// let dolphins = [97,112,101];
// let koalas =  [109,95,106];
let sumDolphin = 0;
let sumKoala = 0;

for (i = 0; i < dolphins.length; i++) {
    let val = dolphins[i];
    sumDolphin += val;
}
sumDolphin /= dolphins.length;
console.log('sumDolphin: ' + sumDolphin);
for (i = 0; i < koalas.length; i++) {
    let val = koalas[i];
    sumKoala += val;
}
sumKoala /= koalas.length;
console.log('sumKoala: ' + sumKoala);

const winScore = 100;
let isDolphinWinnable = (sumDolphin >= winScore);
let isKoalaWinnable = (sumKoala >= winScore);

let winner = ''
if ((sumDolphin > sumKoala) && (isDolphinWinnable)) {
    console.log('Dolphin wins');
} else if ((sumDolphin < sumKoala) && (isKoalaWinnable)) {
    console.log('Koala wins');
} else if ((sumDolphin === sumKoala) && (isDolphinWinnable && isKoalaWinnable)) {
    console.log('Draw');
} else {
    console.log('No winner');
}
