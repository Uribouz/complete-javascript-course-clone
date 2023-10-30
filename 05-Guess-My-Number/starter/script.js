'use strict';

// console.log('Test');

// console.log(document.querySelector('.message'));
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = '🎉 Correct Number!';

// document.querySelector('.number').textContent = 13;

// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 10;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let isWon = false;
let highestScore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}
const displayNumber = function(number) {
    document.querySelector('.number').textContent = number;
}
const displayScore = function(score) {
    document.querySelector('.score').textContent = score;
}

document.querySelector('.check').addEventListener('click', function() {
    // console.log(document.querySelector('.guess').value);

    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess);

    if (isWon) {
        return;
    }
    if (!guess) {
        displayMessage('⛔️ No number!');
    } else if (guess === secretNumber) {
        displayNumber(secretNumber);
        displayMessage('🎉 Correct Number!');

        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        if (score > highestScore) {
            highestScore = score;
            document.querySelector('.highscore').textContent = highestScore;
        }
        isWon = true;
    } else if (score <= 1) {
        displayMessage('💥 You lost the game!');
        displayScore(0);
    } else if (guess !== secretNumber) {
        score--;
        displayScore(score);
        displayMessage( guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
    }

});

document.querySelector('.again').addEventListener('click', function() {
    console.log('Reset clicked');
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    isWon = false;
    displayScore(score);  
    displayMessage('Start guessing..');
    displayNumber('?');
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});