'use strict';

let secretNumber;
let score;
let highscore = 0;

// Function display message in UI
const displayMessage = message => document.querySelector('.message').textContent = message;

// Function display secret number when player wins and hide it when player reset the game
const changeSecretNumber = secretNumberWindow => {
    document.querySelector('.number').textContent = secretNumberWindow;
}

//Function update score UI by score variable
const displayScore =  () => document.querySelector('.score').textContent = score;

//Function generate secret number between 1 to 20
const generateNumber = () => {
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    score = 20;
    // Test data
    // console.log(secretNumber);
}
generateNumber();

// Function change backround color and width when player wins and resets when player press play again
const uiChange = (color,width) => {
    document.querySelector('body').style.backgroundColor = color;
    document.querySelector('.number').style.width = width;
}

// Event listener when player click check button will check player guess input value
document.querySelector('.check').addEventListener('click',function(){
    const guess = Number(document.querySelector('.guess').value);
    
    //When there is no input
    if (!guess) {
        displayMessage('No number ⛔');
        // When player wins
    } else if (guess === secretNumber) {       
        changeSecretNumber(secretNumber);
        displayMessage('Correct number 🎊');
        uiChange('#60b347','30rem');
        if (highscore < score) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
        // When guess is wrong
    } else if (guess !== secretNumber){
        if (score > 1) {
            score--;
            displayMessage(guess > secretNumber ? 'Number is to high 📈': 'Number is to low 📉');
            displayScore();
        } else {     
            displayMessage('Game over');  
        }
    } 
})
// Coding Challange #1 section 07
// Reset settings on click again button
document.querySelector('.again').addEventListener('click', function(){
    generateNumber();
    displayMessage('Start guessing...');  
    uiChange('#222','15rem');
    changeSecretNumber('?');
    displayScore();
    document.querySelector('.guess').value = '';
})
