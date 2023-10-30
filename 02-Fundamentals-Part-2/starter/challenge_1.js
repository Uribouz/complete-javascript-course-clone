'use strict';

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = function(team1, team1Name, team2, team2Name) {
    if (team1 >= team2*2) {
        console.log(`${team1Name} win (${team1} vs. ${team2})`);
    } else if (team2 >= team1*2) {
        console.log(`${team2Name} win (${team2} vs. ${team1})`);
    } else {
        console.log(`No one wins`);
    }
}

checkWinner(
    calcAverage(44,23,71), 'Dolphins',
    calcAverage(65,54,49), 'Koalas',
);


checkWinner(
    calcAverage(85,54,41), 'Dolphins',
    calcAverage(23,34,27), 'Koalas',
);
