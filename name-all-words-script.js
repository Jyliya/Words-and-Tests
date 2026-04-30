let data = fetch("words_in_categories.json");
let categories = [];
let wordArrays = [];
let gueesedWords = [];
let maxPoints = 0;
let catNum;

data
    .then(response => response.json())
    .then(json => {
        for (const item in json) {
            categories.push(item);
            wordArrays.push(json[item])
        }
    })
    .catch(error => console.error(error));


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
} // Get random number

document.querySelector("#start-btn").addEventListener("click", () => {
    document.querySelector("#start-btn-block").style.display = "none";
    document.querySelector("#game-block").style.display = "block";
    catNum = getRandom(0, categories.length - 1);
    document.querySelector("#category").textContent = categories[catNum];
    for (let i = 0; i < 15; i++) {
        if (fillWordBlock(i, catNum)) {
            document.querySelector("#game-block").appendChild(fillWordBlock(i, catNum));
        }
    }
    document.querySelector("#max-points").textContent = maxPoints / 2;
})

document.querySelector("#submit-btn").addEventListener("click", checkAnswer);

document.querySelector("#word-input").addEventListener("keydown", (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
        e.preventDefault();
        checkAnswer();
    }
})

function checkAnswer() {
    let inputWord = document.querySelector("#word-input").value.trim().toLowerCase();
    if (wordArrays[catNum].includes(inputWord) && !gueesedWords.includes(inputWord)) {
        let wordDiv = document.querySelector(`#words-${inputWord.length}`)
        let wordBlock = createWordP(inputWord, "gueesed");
        wordDiv.appendChild(wordBlock);

        addPoints(`#words-${inputWord.length}-score`, 1);
        addPoints("#points", 5);
        checkPoints();
        gueesedWords.push(inputWord)
    }
    document.querySelector("#word-input").value = "";
}


function addPoints(id, point) {
    let blockScore = document.querySelector(id).textContent;
    blockScore = Number(blockScore) + point;
    document.querySelector(id).textContent = blockScore;
}

function checkPoints() {
    if (document.querySelector("#points").textContent == (maxPoints / 2)) {
        new swal({
            title: "Congratulations!",
            text: 'You gueesed all words.',
            icon: "success",
            draggable: true
        }).then(() => {
            location.reload();
        });
    };
}

function createDiv(className) {
    let div = document.createElement("div");
    div.classList.add(className);
    return div;
}

function createWordP(word, className) {
    let p = document.createElement("p");
    p.classList.add(className);
    p.textContent = word;
    return p
}

function createSpan(word, id) {
    let span = document.createElement("span");
    span.id = id;
    span.textContent = word;
    return span
}

function createScore(num, wordNum) {
    let p = document.createElement("p");
    p.classList.add("block-score");
    p.appendChild(createSpan(0, `words-${wordNum}-score`));
    p.appendChild(createWordP(`/${num}`))
    return p
}

function fillWordBlock(num, categ) {
    let div = createDiv("word-block");
    let index = 0;
    for (const word of wordArrays[categ]) {
        if (word.length == num) {
            index++
        }
    }
    if (index != 0) {
        maxPoints = maxPoints + index * 5;
        let headerDiv = createDiv("word-block-header");
        headerDiv.appendChild(createWordP(`${num}-letter words`, "word-header"));
        headerDiv.appendChild(createScore(index, num));
        div.appendChild(headerDiv);
        div.id = `words-${num}`;
        return div
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyA" && e.shiftKey) {
        window.location.href = "/Words-and-Tests/results.html"
    }
})