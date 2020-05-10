const circles = document.querySelectorAll('[data-circle]');
const gameContainer = document.querySelector('.game-container');
const containerBefore = document.querySelector('[data-containerBefore]');
const containerAfter = document.querySelector('[data-containerAfter]');
const middle = document.querySelector('.middle');
const playAgain = document.querySelector('.play-again');
const btnRules = document.querySelector('.rules');
const rulesModal = document.querySelector('.rules-modal');
const closeModal = document.querySelector('.header img');

function handlerTransitionOne() {
  circles.forEach((circle) => {
    circle.classList.remove('fadeIn');
    circle.classList.add('fadeOut');
    setTimeout(() => {
      containerBefore.classList.add('displayNone');
    }, 500);
  });
  gameContainer.classList.remove('fadeIn');
  gameContainer.classList.add('fadeOut2');
  handlerTransitionTwo();
}

function handlerTransitionTwo() {
  setTimeout(() => {
    containerAfter.classList.remove('fadeOut');
    containerAfter.classList.remove('displayNone');
  }, 500);
  setTimeout(() => {
    containerAfter.classList.add('fadeIn');
  }, 600);
  setTimeout(() => {
    middle.classList.add('fadeIn2');
  }, 1000);
}

function backToHome() {
  const divUserPicked = document.getElementById('userPicked');
  const divHousePicked = document.getElementById('housePicked');
  middle.classList.remove('fadeIn2');
  containerAfter.classList.remove('fadeIn');
  containerAfter.classList.add('fadeOut');
  setTimeout(() => {
    containerAfter.classList.add('displayNone');
    divUserPicked.classList.remove('paper', 'rock', 'scissors');
    divHousePicked.classList.remove('paper', 'rock', 'scissors');
  }, 500);
  setTimeout(() => {
    containerBefore.classList.remove('displayNone');
  }, 600);
  circles.forEach((circle) => {
    setTimeout(() => {
      circle.classList.remove('fadeOut');
      circle.classList.add('fadeIn');
    }, 700);
    setTimeout(() => {
      gameContainer.classList.remove('fadeOut2');
      gameContainer.classList.add('fadeIn');
    }, 800);
  });
  continuGame();
}

playAgain.addEventListener('click', backToHome);

circles.forEach((circle) => {
  circle.addEventListener('click', handlerTransitionOne);
});

btnRules.addEventListener('click', () => {
  rulesModal.classList.add('activeModal');
});

closeModal.addEventListener('click', () => {
  rulesModal.classList.remove('activeModal');
});

rulesModal.addEventListener('click', () => {
  if (event.currentTarget === event.target)
    rulesModal.classList.remove('activeModal');
});

/*
 * Rock, Paper, Scissors Logic
 */

var choices = ['paper', 'rock', 'scissors'];
var i = Math.floor(Math.random() * 3);
var houseChoice = choices[i];
var userPoints = +localStorage.getItem('score');
const info = document.querySelector('.who');
const iconReset = document.querySelector('.icon-reset');
localStorage.setItem('score', userPoints);

function changeScore() {
  var score = (document.querySelector('.score').innerHTML = userPoints);
}
setInterval(changeScore, 50);

function updateScore() {
  if (userPoints == null) {
    return (userPoints = 0);
  } else {
    userPoints = +localStorage.getItem('score');
  }
}

function convert(word) {
  if (word === 'paper')
    return '<img src="./images/icon-paper.svg" alt="Paper" />';
  if (word === 'rock') return '<img src="./images/icon-rock.svg" alt="Rock" />';
  return '<img src="./images/icon-scissors.svg" alt="Scissors" />';
}

function game(userChoice) {
  var userPicked = document.getElementById('userPicked');
  var housePicked = document.getElementById('housePicked');
  userPicked.innerHTML = convert(userChoice);
  housePicked.innerHTML = convert(houseChoice);
  userPicked.classList.add(userChoice);
  housePicked.classList.add(houseChoice);
  if (
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    win();
  } else if (userChoice === houseChoice) {
    draw();
  } else {
    lose();
  }
}

function continuGame() {
  i = Math.floor(Math.random() * 3);
  houseChoice = choices[i];
}

function win() {
  setTimeout(() => {
    userPoints++;
    localStorage.setItem('score', userPoints);
  }, 1200);
  info.innerHTML = 'You Win!';
}
function draw() {
  info.innerHTML = "It's a Draw";
}
function lose() {
  setTimeout(() => {
    if (userPoints > 0) userPoints--;
    localStorage.setItem('score', userPoints);
  }, 1200);
  info.innerHTML = 'You Lose...';
}

iconReset.addEventListener('click', () => {
  userPoints = 0;
  localStorage.setItem('score', 0);
});
