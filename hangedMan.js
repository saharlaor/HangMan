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

if (require.main === module) {
    (function () {
        'use strict';

        // External packages
        const figlet = require('figlet');
        const randomWords = require('random-words');
        const prompts = require('prompt-sync')();
        const sleep = require('system-sleep');

        // Project consts, lets
        let isWon = false;
        const word = randomWords();
        const FONTS = ["Banner", "Big", "Blocks", "Cricket", "Doom", "Rectangles", "Speed"];
        const openingScreenFont = FONTS[Math.floor(Math.random() * FONTS.length)];
        const hangmanIllustrations  = [`







=========`, `






      |
=========`, `





      |
      |
=========`, `




      |
      |
      |
=========`, `



      |
      |
      |
      |
=========`, `


      |
      |
      |
      |
      |
=========`, `
    
      |
      |
      |
      |
      |
      |
=========`, `
    --+
      |
      |
      |
      |
      |
      |
=========`, `
  +---+
      |
      |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
      |
      |
      |
      |
      |
=========`, `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
      |
=========`];
        const freemanIllustrations = [`

(_)
/|\\
 |
/ \\
`, `

(_)
\\|/
 |
/ \\
    `];

        /**
        * Main function of the game, includes opening screen and the actual game.
        *
        * Print title screen in baloon letters.
        *
        * @since  1.0.0
        **/
        function hangMan() {
            // Print opening screen
            figlet("Hang Man", {
                font: openingScreenFont,
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true
            }, (err, data) => {
                if (err) {
                    // Handling ctrl+c
                    process.on('SIGINT', function () {
                        console.clear();
                        console.log("Goodbye");
                        process.exit();
                    });

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
                for (let i = 0; i < 15; i++) {
                    console.log(`Congratulations!
    You found the word ${word} and saved the man`);
                    console.log(freemanIllustrations[i % 2]);
                    sleep(300);
                    console.clear();
                }
                console.log(`You won!
    The word was ${word}`);
            } else {
                console.log(`Game over!
    You lost
    The word was ${word}`);
                console.log(hangmanIllustrations[10]);
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
                } else if (guess.length != 1 && guess.length != word.length) {
                    isValidInput = false;
                    console.log("You entered invalid amount of characters");
                } else if (!/[a-z]+/.test(guess)) {
                    isValidInput = false;
                    console.log("Your guess consisted of invalid characters");
                } else if (guessed.includes(guess)) {
                    isValidInput = false;
                    console.log(`You already guessed ${guess}`);
                }
            } while (!isValidInput);

            // Return the guessed letter and whether it exists
            return {
                isInWord: word.indexOf(guess) != -1,
                guess: guess 
            }
        }

        /**
        * Update the hidden word with all the matches of the player guess.
        *
        * In case of a single letter guess, iterate both word and hiddenWord.
        * If the letter in the index matches the guess, insert to hiddenWord.
        * In case of whole word guess, check if the guess is the word.
        *
        * @since  1.0.0
        *
        * @param {string}   word           The word.
        * @param {string}   hiddenWord     The obscured word.
        * @param {string}   guess          The player guess.
        *
        * @return {string} Updated hiddenWord with guess.
        **/
        function updateHiddenWord(word, hiddenWord, guess) {
            if (guess.length === 1) {
                // In case the player guessed a single letter
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === guess) {
                        hiddenWord = 
                        hiddenWord.substring(0, i)
                        + guess
                        + hiddenWord.substring(i + 1);
                    }
                }
            } else if (word == guess) {
                // In case the player guessed the whole word
                hiddenWord = word;
            }

            return hiddenWord;
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
            while (misses < 10 && !isWon) {
                console.log("\nThe word is:\n" + hiddenWord + "\n");
                
                // Give the player a turn
                let guessObj = playerTurn(word, guessed);
                guessed.push(guessObj.guess);
                if (guessObj.isInWord) {
                    hiddenWord = updateHiddenWord(word, hiddenWord, guessObj.guess);
                } else { misses += 1; }

                // Print game status
                console.clear();
                console.log(`You have missed a total of ${misses} times`);
                console.log("All your guesses: " + guessed.join(", "));
                console.log(hangmanIllustrations[misses]);

                // Update whether the player has won
                isWon = (hiddenWord === word);
            }
            console.clear();
            return isWon;
        }

        // Start Game
        hangMan();
    })();
}