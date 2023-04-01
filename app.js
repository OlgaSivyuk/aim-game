const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up')
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')){
     time = parseInt(event.target.getAttribute('data-time'));
     screens[1].classList.add('up');
     startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
};

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
};

function finishGame(){
//   timeEl.parentNode.remove();
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`
};

function setColor(element) {
  const color = getRandomColor();
  element.style.background = `linear-gradient(90deg, ${color[0]} 0%, ${color[1]} 47%, ${color[2]} 100%)`;
};

function getRandomColor() {
    const groupColors = [
        ['#F06651', '#FF6799', '#F183E3'],
        ['#37EF8C', '#A4E35B', '#E3D247'],
        ['#FF01C0', '#A147B9', '#6E3B96'],
        ['#16d9e3', '#30c7ec', '#46aef7'],
        ['#B69531', '#A53040', '#350F58'],
        ['#53206F', '#9163A1', '#CFA9D7'],
        ['#5BD20B', '#00ACE7', '#4F4BDB'],

    ]
    const groupIndex = Math.floor(Math.random() * groupColors.length);
    const group = groupColors[groupIndex];
    // const colorIndex = Math.floor(Math.random() * group.length);
    // const color = group[colorIndex];
    console.log(group);
    return group;
  }

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRundomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRundomNumber(0, width - size);
  const y = getRundomNumber(0, height - size);
//   const color = getRandomColor();
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
//   circle.style.background = `linear-gradient(90deg, ${color[0]} 0%, ${color[1]} 47%, ${color[2]} 100%)`;
  setColor(circle)
  board.append(circle);
};

function getRundomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
};




