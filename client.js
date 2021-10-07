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

// Handle keyboard key stroke event
document.addEventListener("keydown", pressKey);

// Handle onscreen keyboard key click event
const keySpans = document.getElementsByClassName("key");
for (let i = 0; i < keySpans.length; i++) {
    keySpans[i].onclick = clickKey;
}

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
    console.log(this.outerText);
}
