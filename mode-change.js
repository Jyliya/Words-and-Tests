let mode = localStorage.getItem("mode");

if (mode == "night") {
    document.body.classList.toggle("night-mode");
    if (window.location.pathname == "/Words-and-Tests/index.html") {
        document.querySelector("select").classList.toggle("night-mode");
    }
    document.querySelector("header").classList.toggle("night-mode");
    document.querySelectorAll("button").forEach(elem => { elem.classList.toggle("night-mode"); })
    document.querySelectorAll("input").forEach(elem => { elem.classList.toggle("night-mode"); })
}

document.querySelector("#mode").addEventListener("click", () => {
    let mode = localStorage.getItem("mode");
    if (mode == "night") {
        document.body.classList.toggle("night-mode");
        if (window.location.pathname == "/Words-and-Tests/index.html") {
            document.querySelector("select").classList.toggle("night-mode");
        }
        document.querySelector("header").classList.toggle("night-mode");
        document.querySelectorAll("button").forEach(elem => { elem.classList.toggle("night-mode"); })
        document.querySelectorAll("input").forEach(elem => { elem.classList.toggle("night-mode"); })
        localStorage.removeItem("mode");
    }
    else {
        document.body.classList.toggle("night-mode");
        if (window.location.pathname == "/Words-and-Tests/index.html") {
            document.querySelector("select").classList.toggle("night-mode");
        }
        document.querySelector("header").classList.toggle("night-mode");
        document.querySelectorAll("button").forEach(elem => { elem.classList.toggle("night-mode"); })
        document.querySelectorAll("input").forEach(elem => { elem.classList.toggle("night-mode"); })
        localStorage.setItem("mode", "night");
    }
})

if (window.location.pathname == "/Words-and-Tests/sentence-test.html") {
    if (localStorage.getItem("sentenceInstructions")) {
        document.querySelector("#instruction-box").style.display = "none";
    }
}
if (window.location.pathname == "/Words-and-Tests/name-all-words.html") {
    if (localStorage.getItem("categoryInstructions")) {
        document.querySelector("#instruction-box").style.display = "none";
    }
}

window.addEventListener("load", () => {
    createImg("/Words-and-Tests/cobweb.png", "cobweb");
    createImg("/Words-and-Tests/cobweb2.png", "cobwebTwo");
    createImg("/Words-and-Tests/skeleton.gif", "skeleton");
    createImg("/Words-and-Tests/bat.gif", "bat");
})

function createImg (src, id) {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("decoration");
    img.id = id;
    document.body.appendChild(img);
}

const resultsD = JSON.parse(localStorage.getItem("results"));

if (resultsD == null) {
    localStorage.setItem("results", JSON.stringify({"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "0": 0, "Sentences": 0}))
}