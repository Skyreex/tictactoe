const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const nextButton = document.getElementById("next");
const skinButton = document.getElementById("skin");
const saveButton = document.getElementById("save");
const nameInput = document.querySelector(".name-box").querySelectorAll("input");
const scoreBoard = document.querySelector("h1");
const skinBox = document.querySelector(".skin-container");
const box = document.querySelector(".container").children;
const loadingPage = document.querySelector(".loading")


let count = 0;
let countStart = 0;
let xPositions = [];
let oPositions = [];
let p1Name = "Player 1";
let p2Name = "Player 2";
let p1Score = 0;
let p2Score = 0;
let gameOver = false;
let p1Skin = "X";
let p2Skin = "O";


let loadingInterval = setInterval(loading, 500)
setTimeout(changeLoadingPage, 3000)

//  START Event
startButton.addEventListener("click", start);

//  RESET Event
nextButton.addEventListener("click", next);

//  RESET Event
resetButton.addEventListener("click", reset);

// SKIN Event
skinButton.addEventListener("click", () => {
    skinBox.classList.remove("hidden");
    skinBox.parentElement.classList.remove("hidden");
})

// SAVE Event
saveButton.addEventListener("click", save)

Array.from(box).forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameOver && !box.textContent) {
            count++;
            box.innerHTML = xOrO(count, box.id);
            if (xPositions.length > 2 || oPositions.length > 2) count % 2 ? checkWinner(xPositions) : checkWinner(oPositions);
        }
    });
});

function xOrO(val, position) {
    if (val % 2) {
        xPositions.push(position);
        return p1Skin;
    } else {
        oPositions.push(position);
        return p2Skin;
    }
}

function checkWinner(array) {
    // Three for loops to extract 3 values from the array
    for (let i = 0; i < array.length; ++i) {
        for (let j = 0; j < array.length; ++j) {
            for (let k = 0; k < array.length; ++k) {
                if (i == j || i == k || j == k) continue;
                const tempArray = [array[i], array[j], array[k]];
                tempArray.sort();
                const [a, b, c] = [tempArray[0][0], tempArray[1][0], tempArray[2][0]];
                if (a % 2 == 0 && b % 2 == 0 && c % 2 == 0) continue;
                if (b - a == c - b) {
                    const sum = tempArray.reduce((acc, curr) => acc + Number(curr[1]), 0);
                    if (sum == 10 || sum == 8 || sum == 14) {
                        count % 2 ? p1Score++ : p2Score++;
                        gameOver = true;
                        showPattern(tempArray);
                        updateScoreBoard();
                        return;
                    }
                }
            }
        }
    }
}

function updateScoreBoard() {
    scoreBoard.innerHTML = `${p1Name} <span>${p1Score}:${p2Score}</span> ${p2Name} `
}

function showPattern(array) {
    Array.from(box).forEach((box) => {
        if (array.includes(box.id)) box.classList.add("pattern");
        else box.classList.add("pattern30")
    })
}

function start() {
    p1Name = nameInput[0].value || p1Name;
    p2Name = nameInput[1].value || p2Name;
    document.querySelector(".name-box-container").style.display = "none";
    updateScoreBoard();
}

function reset() {
    Array.from(box).forEach((box) => {
        box.textContent = "";
        box.removeAttribute("class")
    });
    gameOver = false;
    xPositions = [];
    oPositions = [];
    count = countStart = countStart ? 1 : 0;
}

function next() {
    reset();
    count = countStart = countStart ? 0 : 1;
}

function save() {
    let count = 0;
    skinBox.classList.add("hidden");
    skinBox.parentElement.classList.add("hidden");
    skinBox.querySelectorAll("input").forEach(((skin) => {
        if (skin.checked && !count) {
            count += 1;
            p1Skin = skin.parentElement.textContent;
        }
        else if (skin.checked && count)
            p2Skin = skin.parentElement.textContent;
    }))
}

function loading() {
    loadingPage.children[0].textContent = loadingPage.children[0].textContent.length == 10 ? "Loading" : loadingPage.children[0].textContent += "."
}

function changeLoadingPage() {
    clearInterval(loadingInterval);
    loadingPage.classList.add("hidden");
}