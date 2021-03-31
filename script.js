'use strict';

// constants
// CSS classes name
const PLAY_AGAIN_BOX_CLASS = '.play-again-box';
const GUESS_BOX_CLASS = '.guess-box';

const MESSAGE_LABEL_CLASS = '.message-label';
const NUMBER_LABEL_CLASS = '.number-label';

const HIGHSCORE_LABEL_CLASS = '.highscore';
const SCORE_LABEL_CLASS = '.score';

const CHECK_CLASS = '.check';

const GREY_COLOR = '#eee';

// variables;
let score = 200;
let highscore = 0;
let hiddenNumber = undefined;

// functions
const createRandomNumber = (value) => {
    return Math.trunc(Math.random() * value + 1);
};

const updateHTMLContentFrom = (className, newValue) => {
    document.querySelector(className).textContent = newValue;
};

const numberLengthIsValid = (number) => number >= 1 && number <= 100;

const displayMessage = (msg) => {
    updateHTMLContentFrom(MESSAGE_LABEL_CLASS, msg);
};

const checkUserNumber = (number) => {
    if (!numberLengthIsValid(number)) {
        displayMessage('Enter a number between (1 - 100) inclusive');
    } else if (number == hiddenNumber) {
        displayMessage('🎉 Correct! 🎉');
        updateHighscore();
        changeNumberLabelBackgroundColor('lightgreen');
    } else if (number > hiddenNumber) {
        displayMessage('Too high!');
        updateScore();
        changeNumberLabelBackgroundColor('skyblue');
    } else {
        displayMessage('Too low!');
        updateScore();
        changeNumberLabelBackgroundColor('orange');
    }
};

const changeNumberLabelBackgroundColor = (color) => {
    document.querySelector(NUMBER_LABEL_CLASS).style.background = color;
};

const updateScore = () => {
    score -= 2;
    updateHTMLContentFrom(SCORE_LABEL_CLASS, score);
};

const updateHighscore = () => {
    if (score > highscore) {
        highscore = score;
        updateHTMLContentFrom(HIGHSCORE_LABEL_CLASS, highscore);
    }
};

const updateNumberLabel = (newValue) => {
    if (numberLengthIsValid(newValue)) {
        updateHTMLContentFrom(NUMBER_LABEL_CLASS, newValue);
    }
};

const clickCheckButton = () => {
    document.querySelector(CHECK_CLASS).addEventListener('click', () => {
        const guess = document.querySelector(GUESS_BOX_CLASS).value;

        if (!guess) {
            return;
        } else {
            checkUserNumber(Number(guess));
            updateNumberLabel(guess);
        }
    });
};

const reset = () => {
    hiddenNumber = createRandomNumber(100);
    score = 200;

    updateHTMLContentFrom(
        MESSAGE_LABEL_CLASS,
        'Enter a number between (1 - 100) inclusive'
    );
    updateHTMLContentFrom(SCORE_LABEL_CLASS, score);
    updateHTMLContentFrom(NUMBER_LABEL_CLASS, '?');

    changeNumberLabelBackgroundColor('#eee');
    document.querySelector(GUESS_BOX_CLASS).value = '';
};

const clickPlayAgainButton = () => {
    document
        .querySelector(PLAY_AGAIN_BOX_CLASS)
        .addEventListener('click', () => {
            reset();
        });
};

// main
hiddenNumber = createRandomNumber(100);
clickCheckButton();
clickPlayAgainButton();
