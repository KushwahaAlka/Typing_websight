let startBtn = document.getElementById("startBtn");
let textInput = document.getElementById("textInput");
let showText = document.getElementById("showText");
let result = document.getElementById("speed");
let accuracyDisplay = document.getElementById("accuracy");
let showRandomData = document.getElementById("showRandomData");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});

let data = [
    "JavaScript is a versatile scripting language...",
    "The language enables the creation of modern web functionalities...",
    // Add more challenging text prompts or paragraphs
    "JavaScript works alongside HTML and CSS...",
    "The asynchronous nature of JavaScript enables it to handle multiple tasks...",
];

let leaderboard = [];
let historyLog = [];

let randomNum = Math.random() * data.length;
let randomData = data[Math.floor(randomNum)];
let startTime;
let endTime;

function updateLeaderboard(name, speed) {
    leaderboard.push({ name, speed });
    leaderboard.sort((a, b) => b.speed - a.speed);
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboardDiv = document.getElementById("leaderboard");
    leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";
    leaderboard.forEach((entry, index) => {
        leaderboardDiv.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.speed} WPM</p>`;
    });
}

function displayHistory() {
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "<h2>Typing History</h2>";
    historyLog.forEach((log, index) => {
        historyDiv.innerHTML += `<p>${index + 1}. ${log}</p>`;
    });
}

function endTest() {
    let time = new Date();
    endTime = time.getTime();
    let complitionTime = Math.floor((endTime - startTime) / 1000);
    let wordLength = textInput.value.split(" ").length;
    let speed = Math.round((wordLength / complitionTime) * 60);

    let correctCharacters = 0;
    let userInput = textInput.value;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === randomData[i]) {
            correctCharacters++;
        }
    }
    let accuracy = Math.round((correctCharacters / randomData.length) * 100);

    result.innerHTML = `You typed ${wordLength} words in ${complitionTime} seconds: Your typing speed is ${speed} words per minute.`;
    accuracyDisplay.innerHTML = `Your typing accuracy is ${accuracy}%.`;

    historyLog.push(`Speed: ${speed} WPM, Accuracy: ${accuracy}%, Time: ${complitionTime}s`);
    displayHistory();

    const userName = prompt("Enter your name for the leaderboard:");
    if (userName) updateLeaderboard(userName, speed);
}

startBtn.addEventListener("click", function () {
    if (startBtn.innerText == "Start") {
        textInput.disabled = false;
        textInput.style.backgroundColor = "white";
        startBtn.innerText = "Done";
        let time = new Date();
        startTime = time.getTime();
        showRandomData.innerHTML = randomData;
    } else if (startBtn.innerText == "Done") {
        textInput.disabled = true;
        startBtn.innerText = "Start";
        endTest();
    }
});

const durationSelect = document.getElementById("duration-select");
durationSelect.addEventListener("change", function () {
    const selectedDuration = parseInt(durationSelect.value);
    setTimeout(() => {
        if (startBtn.innerText === "Done") {
            startBtn.click(); // Auto-end test after the duration
        }
    }, selectedDuration * 1000);
});
