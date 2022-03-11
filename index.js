const button = document.querySelector(".button");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const image = document.querySelector(".image");
const enBtn = document.querySelector(".language-en");
const ruBtn = document.querySelector(".language-ru");
const language = document.querySelector(".language");
const enUrl = "https://type.fit/api/quotes";
const ruUrl = "./quotes.json"

let mode = "en";

button.addEventListener("click", changeInfo);

enBtn.addEventListener("click", runEnMode);
ruBtn.addEventListener("click", runRuMode);

changeInfo();

function runRuMode() {
    if (mode == "en") {
        button.textContent = "Другая цитата";
        language.textContent = "Выберите язык: ";
        enBtn.classList.remove("language-active");
        ruBtn.classList.add("language-active");
        mode = "ru";
        changeInfo();
    }
}

function runEnMode() {
    if (mode == "ru") {
        button.textContent = "Another quote";
        language.textContent = "Choose language: ";
        ruBtn.classList.remove("language-active");
        enBtn.classList.add("language-active");
        mode = "en";
        changeInfo();
    }
}

async function changeInfo() {
    let response;
    mode == "en"?response = await fetch(enUrl):response = await fetch(ruUrl);
    let quoteList = await response.json();
    changeQuote(quoteList, 0, quoteList.length-1);
    console.log(quoteList.length-1);
    changeImage();
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function changeImage() {
    let imgLink = `url("./img/img-${getRandomInt(1, 12)}.png")`;
    if (image.style.backgroundImage == imgLink) {
        changeImage();
    } else {
        image.style.backgroundImage = imgLink;
    }
}

function changeQuote(list, min, max) {
    let randomInt = getRandomInt(min, max);
    console.log(randomInt);
    if (quoteText.textContent == list[randomInt].text) {
        changeQuote(list);
    } else {
        quoteText.textContent = list[randomInt].text;
        if (list[randomInt].author === null) {
            mode == "en"?quoteAuthor.textContent = "Author unknown":quoteAuthor.textContent = "Автор неизвестен";
        } else {
            quoteAuthor.textContent = list[randomInt].author;
        }
    }
}