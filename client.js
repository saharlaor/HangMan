document.addEventListener("keydown", pressKey);

const keySpans = document.getElementsByClassName("key");
for (let i = 0; i < keySpans.length; i++) {
    keySpans[i].onclick = clickKey;
}

function clickKey() {
    console.log(this.outerText);
}

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
