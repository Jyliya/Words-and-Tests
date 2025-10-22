let data = fetch("words.json");
let dataArr = [];
let qNums = localStorage.getItem("used questions for game");
let aNums = [];
let tryN = localStorage.getItem("number of tries");
let record = localStorage.getItem("record");

if (record == null) {
    record = 0;
}
else {
    record = JSON.parse(record)
}

if (tryN == null) {
    tryN = 0
}
else {
    let pos = document.cookie.indexOf("result1");
    if (pos == -1) {
        tryN = 0;
        localStorage.removeItem("number of tries")
    }
    else {
        tryN = JSON.parse(tryN)
    }
}

if (qNums == null) {
    qNums = []
}
else {
    qNums = JSON.parse(qNums)
}

data
    .then(response => response.json())
    .then(json => {
        for (item of json["words"]) {
            dataArr.push(item);
        }
    })
    .catch(error => console.error(error));

let cat = document.querySelector("#cat-block");
let catImage = document.querySelector("#cat-image");
let catStyle = window.getComputedStyle(cat);
let timer = document.querySelector("#timer");
let startBtn = document.querySelector("#start-btn");
let questionNumber = document.querySelector("#q-num");
let recordNum = document.querySelector("#record");
let recordNumFinish = document.querySelector("#record-finish");

let pointSound = new Audio("./sounds/point-sound.wav");
pointSound.volume = 0.1;
let hurtSound = new Audio("./sounds/death-sound.mp3");
hurtSound.volume = 0.1;
let gemeOverSound = new Audio("./sounds/game-over-sound.wav");
gemeOverSound.volume = 0.1;

startBtn.addEventListener("click", startGame);

recordNum.textContent = record;
recordNumFinish.textContent = record;

let deathInt;
let result;
let timerTime = 8;

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            cat.style.backgroundImage = "url('./photos/cat-walking-left.gif')";
            cat.style.height = "64px";
            cat.style.width = "150px";
            moveLeft(cat, 10)
            break
        case "ArrowRight":
            cat.style.backgroundImage = "url('./photos/cat-walking-right.gif')";
            cat.style.height = "64px";
            cat.style.width = "150px";
            moveRight(cat, 10)
            break
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            cat.style.backgroundImage = "url('./photos/cat-sitting.png')";
            cat.style.height = "75px";
            cat.style.width = "70px";
            break
        case "ArrowRight":
            cat.style.backgroundImage = "url('./photos/cat-sitting.png')";
            cat.style.height = "75px";
            cat.style.width = "70px";
            break
    }
})

function moveLeft(element, distance) {
    let left = getComputedStyle(element).left;
    if (!(left == "0px")) {
        element.style.left = parseInt(left) - distance + "px";
    }
}

function moveRight(element, distance) {
    let left = getComputedStyle(element).left;
    if (!(left == "880px")) {
        element.style.left = parseInt(left) + distance + "px";
    }
}

let answers = document.querySelectorAll(".answers");
let deathBlocks = document.querySelectorAll(".death");

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkRand(num, array) {
    do {
        if (array.includes(num)) {
            num = getRandom(0, (dataArr.length - 1));
            if (qNums.length == dataArr.length) {
                qNums = [];
                localStorage.removeItem("questions used");
                break
            }
        }
        else {
            break
        }
    } while (true)
    return num
}//Перевірка на вже викликане питання

function startTimer() {
    timerInterval = setInterval(function () {
        if (timer.textContent == 0) {
            stopTimer()
        }
        else {
            timer.textContent = Number(timer.textContent) - 1;
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(timerInterval);
    checkAnswer();
}

function startGame() {
    document.querySelector("#game-block").style.display = "table-row";
    document.querySelector("#start-screen").style.display = "none";
    document.querySelector("#end-screen").style.display = "none";
    let index = 0;
    for (div of answers) {
        let dBlock = deathBlocks[index];
        dBlock.style.backgroundImage = "none";
        div.style.color = "black";
        index++;
    }
    questionNumber.textContent = 0;
    cat.style.backgroundImage = "url('./photos/cat-sitting.png')";
    getNewQuestion()
}

function getNewQuestion() {
    if (questionNumber.textContent == 15) {
        timerTime = 7
    }
    else if (questionNumber.textContent == 30) {
        timerTime = 6
    }
    else if (questionNumber.textContent == 40) {
        timerTime = 5
    }
    else if (questionNumber.textContent == 50) {
        timerTime = 4
    }
    else if (questionNumber.textContent == 60) {
        timerTime = 3
    }

    timer.textContent = timerTime;
    for (div of answers) {
        div.style.color = "black";
        div.style.border = "2px solid black";
    }
    startTimer();
    questionNumber.textContent = Number(questionNumber.textContent) + 1;

    let randNum = getRandom(0, (dataArr.length - 1));
    randNum = checkRand(randNum, qNums);
    let answerNumber = getRandom(1, 4);

    let question = dataArr[randNum].word;
    let answer = dataArr[randNum].translation;

    document.querySelector("#question").textContent = question;
    document.querySelector(`#answer${answerNumber}`).textContent = answer;

    for (let i = 1; i <= 4; i++) {
        let randomAnswer;
        if (i == answerNumber) {
            continue
        }
        else {
            let randomForArray = checkRand((getRandom(0, (dataArr.length - 1))), aNums);
            if (randomForArray == randNum) {
                i--;
                continue
            }
            else {
                randomAnswer = dataArr[randomForArray].translation;
            }
            document.querySelector(`#answer${i}`).textContent = randomAnswer;
            aNums.push(randomForArray);
        }
    }
    qNums.push(randNum);
    aNums = [];
}

function checkAnswer() {
    if (qNums.length == 0) {
        return
    }
    let answer = dataArr[qNums[qNums.length - 1]].translation
    let chosenAnswer;
    let left = getComputedStyle(cat).left;
    let rightAnswerBlock;
    for (ans of answers) {
        if (ans.firstChild.nextSibling.textContent == answer) {
            rightAnswerBlock = ans;
        }

    }

    if (left >= "150px" && left < "330px") {
        chosenAnswer = document.querySelector("#answer1").textContent
    }
    else if (left >= "330px" && left < "510px") {
        chosenAnswer = document.querySelector("#answer2").textContent
    }
    else if (left >= "510px" && left < "690px") {
        chosenAnswer = document.querySelector("#answer3").textContent
    }
    else if (left >= "690px" && left < "880px") {
        chosenAnswer = document.querySelector("#answer4").textContent
    }

    if (chosenAnswer != undefined) {
        if (chosenAnswer == answer) {
            pointSound.play()
            getNewQuestion()
        } // Перевірка на правильну відповідь
        else {
            gemeOverSound.play()
            setTimeout(fireDeath, 1500, rightAnswerBlock);
        }
    }
    else {
        gemeOverSound.play()
        endGame();
    }
}

function endGame() {
    document.querySelector("#game-block").style.display = "none";
    document.querySelector("#start-screen").style.display = "none";
    document.querySelector("#end-screen").style.display = "block";
    result = questionNumber.textContent;
    localStorage.setItem("used questions for game", (JSON.stringify(qNums)));
    document.querySelector("#result").textContent = result;
    if (result > Number(record)) {
        localStorage.setItem("record", (JSON.stringify(result)));
        record = result;
    }
    recordNum.textContent = record;
}

function getToMenu() {
    document.querySelector("#game-block").style.display = "none";
    document.querySelector("#start-screen").style.display = "block";
    document.querySelector("#end-screen").style.display = "none";
    recordNum.textContent = record;
    recordNumFinish.textContent = record;
}

document.querySelector("#finish-btn").addEventListener("click", getToMenu)

function fireDeath(rightAnswer) {
    hurtSound.play();
    let index = 0;
    for (div of answers) {
        let dBlock = deathBlocks[index];
        index++
        if (div == rightAnswer) {
            continue
        }
        dBlock.style.backgroundImage = "url('./photos/fire.gif')"
        dBlock.style.backgroundSize = "contain";
        div.style.color = "white";
        cat.style.backgroundImage = "url('./photos/cat-sitting-hurt.png')"
    }
    setTimeout(endGame, 3000)
}

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyA" && e.shiftKey) {
        window.location.href = "/results.html"
    }

}) //Відкриття сторінки з результатами

