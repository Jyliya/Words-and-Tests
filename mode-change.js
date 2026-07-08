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