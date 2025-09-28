let data = fetch("words.json");
let dataArr = [];
let qNums = localStorage.getItem("used questions");
let aNums = [];
let type;
let tryN = localStorage.getItem("number of tries");
// console.log(qNums)

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
// console.log(qNums)
data
    .then(response => response.json())
    .then(json => {
        for (item of json["words"]) {
            dataArr.push(item);
        }
    })

const form = document.forms[0];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let allCount = document.querySelector("#all-count");
let correctCount = 0;

function getNewQuestion() {
    let question;
    let answer;
    checkAnswer();
    allCount.textContent = Number(allCount.textContent) + 1;
    endTest();

    let randNum = getRandom(0, (dataArr.length - 1));
    randNum = checkRand(randNum, qNums);
    let answerNumber = getRandom(1, 4);

    switch (type) {
        case "definitions":
            question = dataArr[randNum].definition;
            answer = dataArr[randNum].word;
            break
        case "translations":
            // console.log("question/answer: " + dataArr[randNum].translation);
            question = dataArr[randNum].translation;
            answer = dataArr[randNum].word;
            break
        case "words":
            question = dataArr[randNum].word;
            answer = dataArr[randNum].translation;
            break
    }

    document.querySelector("#question").textContent = question;
    form.querySelector(`#a${answerNumber}`).value = answer;
    document.querySelector(`#answ${answerNumber}`).textContent = answer;

    for (let i = 1; i <= 4; i++) {
        if (i == answerNumber) {
            continue
        }
        else {
            let randomForArray = checkRand((getRandom(0, (dataArr.length - 1))), aNums);
            if (randomForArray == randNum) {
                // console.log("skipped: " + dataArr[randomForArray].word)
                i--;
                continue
            }
            else {
                let answer;
                switch (type) {
                    case "definitions":
                        answer = dataArr[randomForArray].word;
                        break
                    case "translations":
                        answer = dataArr[randomForArray].word;
                        break
                    case "words":
                        answer = dataArr[randomForArray].translation;
                        break
                }
                // console.log(i + " is " +  answer);
                form.querySelector(`#a${i}`).value = answer;
                document.querySelector(`#answ${i}`).textContent = answer;
                aNums.push(randomForArray);
            }
        }
    }
    // console.log(correctCount);
    qNums.push(randNum);
    aNums = [];
}

function startTest() {
    console.log(qNums)
    document.querySelector("#form-block").style.display = "block";
    document.querySelector("#test-choice").style.display = "none";
    form.querySelector("#next").removeEventListener("click", getNewQuestion);
}//Прибирання івентліснерів та ховання елементів

function checkAnswer() {
    let answer;
    if (qNums.length == 0) {
        return
    }

    if (type == "definitions" || type == "translations") {
        answer = dataArr[qNums[qNums.length - 1]].word;
    }
    else if (type == "words") {
        answer = dataArr[qNums[qNums.length - 1]].translation
    }

    if (form.answer.value != "") {
        if (form.answer.value == answer) {
            correctCount += 1;
        } // Перевірка на правильну відповідь
        for (let i = 0; i < 5; i++) {
            form[i].checked = false
        };//Прибирання відмітки
    } //Перевірка на пусту відповідь
}

function checkRand(num, array) {
    do {
        if (array.includes(num)) {
            num = getRandom(0, (dataArr.length - 1));
            console.log(qNums.length);
            console.log(dataArr.length)
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

function endTest() {
    if (allCount.textContent > 30) {
        form.querySelector("#next").removeEventListener("click", getNewQuestion);
        document.querySelector("#form-block").style.display = "none";
        document.querySelector("#test-choice").style.display = "none";
        // alert(`Congratulations. You've gotten ${correctCount.textContent} questions out of 30.`);
        document.querySelector("#congratulation-block").style.display = "block";
        document.querySelector("#correct-count").textContent = correctCount;
        document.querySelector("#congratulation-block").querySelector("button").addEventListener("click", () => {
            document.querySelector("#test-choice").style.display = "block";
            document.querySelector("#congratulation-block").style.display = "none";
        });
        localStorage.setItem("used questions", (JSON.stringify(qNums)));
        // const d = new Date();
        // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        // let expires = "expires=" + d.toUTCString();
        tryN++;
        localStorage.setItem("number of tries", (JSON.stringify(tryN)));
        document.cookie = `result${tryN}=${correctCount}; max-age=604800;`
        correctCount = 0;
        allCount.textContent = 0;


    }
}//Перевірка на кількість пройдених питань

let buttons = document.querySelectorAll(".test-type");
// console.log(buttons)

buttons.forEach(item => {
    item.addEventListener("click", (e) => {
        type = e.target.value;
        startTest();
        form.querySelector("#next").addEventListener("click", getNewQuestion);
        getNewQuestion();
    })
})

console.log(document.cookie)