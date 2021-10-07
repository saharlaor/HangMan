/**
* Handle all user interface for hanged-man game, all communication with server.
*
* Handle key strokes, and onscreen keyboard clicks the same way (guess).
*
* @link   https://github.com/saharlaor/HangMan/blob/feature/frontend/client.js
* @file   This file defines the web UI for hanged-man game.
* @author SaharLaOr.
* @since  1.0.0
**/

// consts & lets
const word = "ENCYCLOPEDIA";
let guessedLetters = Array();
let hiddenWord = document.getElementById("word");

// Set the hidden word
for (let i = 0; i < word.length; i++) {
    hiddenWord.innerHTML = hiddenWord.innerText + "_";
}
hiddenWord.innerHTML = [...hiddenWord.innerText].join(" ");

// Handle onscreen keyboard key click event
const keySpans = document.getElementsByClassName("key");
for (let i = 0; i < keySpans.length; i++) {
    keySpans[i].onclick = clickKey;
}

// Handle keyboard key stroke event
document.addEventListener("keydown", pressKey);

/**
* Handle physical keyboard presses.
*
* When a key is pressed parse the letter out and get the onscreen key,
* Trigger click event and style it to look as if the user hovered above it.
*
* @since  1.0.0
*
* @param {Event}   e           Key down event.
**/
function pressKey(e) {
    if (e.code.substring(0,3) !== "Key") {
        return;
    }
    let keyVal = e.code.replace("Key", "");
    let key = document.getElementById(keyVal);

    key.classList.toggle("key-hover");
    key.click();
    setTimeout(() => {
        key.classList.toggle("key-hover");
    }, 750);
}

/**
* Handle key input from user, apply logic.
*
* When a key is pressed onscreen or physically,
* communicate with server to update the state of the game.
*
* @since  1.0.0
*
**/
function clickKey() {
    const guess = this.outerText;
    guessedLetters.push(guess);

    if (word.indexOf(guess) === -1) {
        this.classList.add("key-wrong");
    } else {
        this.classList.add("key-right");
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                hiddenWord.innerHTML =
                hiddenWord.innerText.substring(0, i * 2)
                + guess
                + hiddenWord.innerText.substring(i * 2 + 1);
            }
        }
    }
}
