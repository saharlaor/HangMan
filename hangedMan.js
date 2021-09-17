/**
* Hangman game written in JavaScript.
*
* The program generates a random word,
* the user guesses letters,
* if the word contains a letter its occurences are revealed,
* o/w the user gets a strike.
* The game continues until the user guesses the word or 10 strikes are reached.
*
* @link   https://github.com/saharlaor/hangman
* @file   This file contains a full hangman game implementation.
* @author SaharLaOr.
* @since  1.0.0
**/

(function () {
    'use strict';
    
    const figlet = require('figlet');

    var isWon = false;

    /**
    * Main function of the game, includes opening screen and the actual game.
    *
    * Print title screen in baloon letters.
    *
    * @since  1.0.0
    **/
    function hangMan() {
        // Print opening screen
        figlet("Hang Man", function(err, data) {
            if (err) {
                console.log("Something went wrong with figlet");
                console.dir(err);
                return;
            } else { console.log(data)};

            // Play the game
            isWon = startGame();
            gameOver(isWon);
        });
    }

    /**
    * Handle the end of a game.
    *
    * Print a relevant message for the end of the game.
    *
    * @since  1.0.0
    *
    * @param {boolean}   isWon           Did the user win the game.
    **/
    function gameOver(isWon) {
        if (isWon) {
            console.log("Congratulations! you got the word and saved the man");
        } else {
            console.log("Game over!\nYou lost");
        }
    }

    /**
    * Go through a user's turn.
    *
    * Let the user guess a letter, check it against the word.
    *
    * @since  1.0.0
    **/
    function userTurn() {
        
    }

    /**
    * Hanged man game.
    *
    * Generate a random word, print it opaquely (using '*').
    * Let the user guess letters until he either wins or
    * accumulate 10 wrong guesses.
    *
    * @since  1.0.0
    * 
    * @returns {boolean} Whether the user won the game
    **/
    function startGame() {
        // Generate a random word

        // Loop until game over
    }

    // Start Game
    hangMan();
})();