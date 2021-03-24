'use strict';

let hiddenNumber = Math.trunc(Math.random() * 101);
let score = 200;
let highscore = 0;

const updateHTMLContentFrom = (className, newValue) => {
    document.querySelector(className).textContent = newValue;
};

const numberLengthIsValid = (number) => number >= 1 && number <= 100;

const checkUserNumber = (number) => {
    if (!numberLengthIsValid(number)) {
        updateHTMLContentFrom(
            '.message-label',
            'Enter a number between (1 - 100) inclusive'
        );
    } else if (number == hiddenNumber) {
        updateHTMLContentFrom('.message-label', '🎉 Correct! 🎉');
        updateHighscore();
        changeNumberLabelBackgroundColor('lightgreen');
    } else if (number > hiddenNumber) {
        updateHTMLContentFrom('.message-label', 'Too high!');
        updateScore();
        changeNumberLabelBackgroundColor('skyblue');
    } else {
        updateHTMLContentFrom('.message-label', 'Too low!');
        updateScore();
        changeNumberLabelBackgroundColor('orange');
    }
};

const changeNumberLabelBackgroundColor = (color) => {
    document.querySelector('.number-label').style.background = color;
};

const updateScore = () => {
    score -= 2;
    updateHTMLContentFrom('.score', score);
};
const updateHighscore = () => {
    if (score > highscore) {
        highscore = score;
        updateHTMLContentFrom('.highscore', highscore);
    }
};

const updateNumberLabel = (newValue) => {
    if (numberLengthIsValid(newValue)) {
        updateHTMLContentFrom('.number-label', newValue);
    }
};

const clickCheckButton = () => {
    document.querySelector('.check').addEventListener('click', () => {
        const guess = document.querySelector('.guess-box').value;

        if (!guess) {
            return;
        } else {
            checkUserNumber(Number(guess));
            updateNumberLabel(guess);
        }
    });
};

const reset = () => {
    hiddenNumber = Math.trunc(Math.random() * 101);
    score = 200;
    updateHTMLContentFrom(
        '.message-label',
        'Enter a number between (1 - 100) inclusive'
    );
    updateHTMLContentFrom('.score', '200');
    updateHTMLContentFrom('.number-label', '?');
    changeNumberLabelBackgroundColor('#eee');
    document.querySelector('.guess-box').value = '';
};
const clickPlayAgainButton = () => {
    document.querySelector('.play-again-box').addEventListener('click', () => {
        reset();
    });
};

clickCheckButton();
clickPlayAgainButton();
