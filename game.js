const LSData1 = JSON.parse(localStorage.getItem('card'));
const LSData2 = JSON.parse(localStorage.getItem('time'));

let inputCards, inputTime;
if (LSData1 !== null && LSData1 !== '') {
    inputCards = Number(LSData1);
}
else {
    inputCards = 4;
}

if (LSData2 !== null && LSData2 !== '') {
    inputTime = Number(LSData2);
}
else {
    inputTime = 60;
}

if (inputTime == 0) {
    inputTime = 60;
}

if (inputCards < 2 || inputCards > 10 || inputCards % 2 != 0) {
    inputCards = 4;
};

const numberOfCards = inputCards * inputCards;

let numberOrder = [];

for (let i = 1; i < numberOfCards / 2 + 1; i++) {
    numberOrder.push(i, i);
}

function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

const numberFinal = shuffle(numberOrder);

let cards = [];

function createCards(n) {
    let container = document.querySelector('.container__game');
    let table = document.createElement('div');
    table.classList.add('table', 'table_' + inputCards);
    let card, cardNumber
    for (let i = 0; i < n; i++) {
        card = document.createElement('div');
        cardNumber = document.createElement('div');

        card.classList.add('table__card', 'table__card_' + inputCards);
        cardNumber.classList.add('card__number', 'card__number_' + inputCards);

        cardNumber.textContent = numberFinal[i];

        card.append(cardNumber);
        table.append(card);
        container.append(table);

        cards.push(card);
    }

    return {
        table,
        cards
    }
}

createCards(numberOfCards);

let counter = 0;
let numberFound = 0;

function closeCards(card1, card2) {
    card1.classList.remove('open__card');
    card1.classList.remove('open__card1');
    card2.classList.remove('open__card');
    card2.classList.remove('open__card2');
    card1.parentNode.style.backgroundColor = "#00D7D6";
    card2.parentNode.style.backgroundColor = "#00D7D6";
};

function foundCards(card1, card2) {
    card1.classList.remove('open__card');
    card1.classList.remove('open__card1');
    card2.classList.remove('open__card');
    card2.classList.remove('open__card2');
    card1.classList.add('found__card');
    card2.classList.add('found__card');
    numberFound = numberFound + 2;
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
        if (counter < 3) {
            cards[i].style.backgroundColor = "#FDDD59";
            cardNumber = cards[i].querySelector('.card__number');
            counter++;
            cardNumber.classList.add('open__card', 'open__card' + counter);
        }
        let firstCard = document.querySelector('.open__card1');
        let secondCard = document.querySelector('.open__card2');
        let thirdCard = document.querySelector('.open__card3');
        if (counter == 2 && firstCard.textContent == secondCard.textContent) {
            foundCards(firstCard, secondCard);
            counter = 0;
        }
        if (counter == 3) {
            console.log(counter);
            closeCards(firstCard, secondCard);
            thirdCard.classList.remove('open__card3');
            thirdCard.classList.add('open__card1');
            firstCard = thirdCard;
            counter = 1;
        }
    });
}


const timerValue = document.querySelector(".tool__sec");
timerValue.textContent = inputTime;

const timer = setInterval(() => {
    let currentCount = parseInt(timerValue.textContent);
    timerValue.textContent = currentCount - 1;

    if (timerValue.textContent < 10) {
        timerValue.style.color = "#F63C59";
        timerValue.style.left = "120px";
    }

    if (numberFound == numberOfCards) {
        clearInterval(timer);
        setTimeout('window.location="success.html"', 1000);
    }

    if (timerValue.textContent == 0) {
        clearInterval(timer);
        setTimeout('window.location="fail.html"', 1000);
    }

}, 1000);










