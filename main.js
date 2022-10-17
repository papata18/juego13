localStorage.removeItem('card');
localStorage.removeItem('time');

const btn = document.querySelector(".start__btn");

btn.addEventListener('click', () => {
    const inputCard = document.getElementById('cards').value;
    const inputTime = document.getElementById('time').value;
    localStorage.setItem('card', JSON.stringify(inputCard));
    localStorage.setItem('time', JSON.stringify(inputTime));
});