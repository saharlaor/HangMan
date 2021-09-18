/**
* Hangman game written in JavaScript.
*
* The program generates a random word,
* the player guesses letters,
* if the word contains a letter its occurences are revealed,
* o/w the player gets a strike.
* The game continues until the player guesses the word or 10 strikes are reached.
*
* @link   https://github.com/saharlaor/hangman
* @file   This file contains a full hangman game implementation.
* @author SaharLaOr.
* @since  1.0.0
**/

(function () {
    'use strict';
    
    const figlet = require('figlet');
    const randomWords = require('random-words');
    const prompts = require('prompt-sync')();

    var isWon = false;
    var word = randomWords();

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
    * @param {boolean}   isWon           Did the player win the game.
    **/
    function gameOver(isWon) {
        if (isWon) {
            console.log(`Congratulations!
You found the word ${word} and saved the man`);
        } else {
            console.log(`Game over!
You lost
The word was ${word}`);
        }
    }

    /**
    * Go through a player's turn.
    *
    * Let the player guess a letter, check it against the word.
    *
    * @since  1.0.0
    *
    * @param {string}   word        The word.
    * @param {Array}    guessed     An array of guessed letters.
    * 
    * @return {Object}  The guess and whether it's in the word
    **/
    function playerTurn(word, guessed) {
        let isValidInput;
        let guess;

        // Ask player for a letter with validation
        do {
            isValidInput = true;
            guess = prompts("Guess a letter: ").toLowerCase();
            if (guess.length === 0) {
                isValidInput = false;
                console.log("You entered nothing, try entering a letter");
                continue;
            }
            if (guess.length != 1) {
                isValidInput = false;
                console.log("You entered more than one character");
                continue;
            }
            if (!/[a-z]/.test(guess)) {
                isValidInput = false;
                console.log("Your guess consisted of invalid characters");
                continue;
            }
            if (guessed.includes(guess)) {
                isValidInput = false;
                console.log(`You already guessed ${guess}`);
                continue;
            }
        } while (!isValidInput);

        // Return the guessed letter and whether it exists
        return {
            exists: word.indexOf(guess) != -1,
            guess: guess
        }
    }

    /**
    * Hanged man game.
    *
    * Generate a random word, print it opaquely (using '*').
    * Let the player guess letters until he either wins or
    * accumulate 10 wrong guesses.
    *
    * @since  1.0.0
    * 
    * @return {boolean} Whether the player won the game
    **/
    function startGame() {
        let hiddenWord = word.replace(/./g, '*');
        let guessed = Array();
        let misses = 0;

        // Loop until game over
        while (misses < 10 && hiddenWord != word) {
            // Print game status
            console.log("\nThe word is:\n" + hiddenWord + "\n");
            
            // Give the player a turn
            let guessObj = playerTurn(word, guessed);
            guessed.push(guessObj.guess);
            if (guessObj.exists) {
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guessObj.guess) {
                        hiddenWord =
                            hiddenWord.substring(0, i)
                            + guessObj.guess
                            + hiddenWord.substring(i + 1);
                    }
                }
            } else { misses += 1; }

            console.clear();
            console.log(`You have missed a total of ${misses} times`);
            console.log("All your guesses: " + guessed.join(", "));

            // Update whether the player has won
            isWon = (hiddenWord === word);
        }
        console.clear();
        return isWon;
    }

    // Start Game
    hangMan();
})();