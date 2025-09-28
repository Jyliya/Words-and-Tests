let data = fetch("words.json");

data
    .then(response => response.json())
    .then(json => {
        for (item of json["words"]) {
            document.querySelector("#word-table").appendChild(addWordToATable(item));
        }
    })


function addWordToATable (elem) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.textContent = elem.word;
    td2.textContent = elem.translation;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}
