const circles = document.querySelectorAll('[data-circle]');
const pentagon = document.querySelector('.pentagon');
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
  pentagon.classList.remove('fadeIn3');
  pentagon.classList.add('fadeOut2');
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
      pentagon.classList.remove('fadeOut2');
      pentagon.classList.add('fadeIn3');
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

// Rock, Paper, Scissors logic

var choices = ['paper', 'rock', 'scissors', 'lizard', 'spock'];
var i = Math.floor(Math.random() * 5);
var houseChoice = choices[i];
var userPoints = +localStorage.getItem('scoreBonus');
const info = document.querySelector('.who');
const iconReset = document.querySelector('.icon-reset');
localStorage.setItem('scoreBonus', userPoints);

function changeScore() {
  var score = (document.querySelector('.score-bonus').innerHTML = userPoints);
}
setInterval(changeScore, 50);

// function updateScore() {
//   if (localStorage.getItem('scoreBonus') === null) {
//     localStorage.getItem('scoreBonus') = 0;
//   } else {
//     userPoints = localStorage.getItem('scoreBonus');
//   }
// }

function convert(word) {
  if (word === 'paper')
    return '<img src="./images/icon-paper.svg" alt="Paper" />';
  if (word === 'rock') return '<img src="./images/icon-rock.svg" alt="Rock" />';
  if (word === 'scissors')
    return '<img src="./images/icon-scissors.svg" alt="Scissors" />';
  if (word === 'lizard')
    return '<img src="./images/icon-lizard.svg" alt="Lizard" />';
  return '<img src="./images/icon-spock.svg" alt="Spock" />';
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
    (userChoice === 'paper' && houseChoice === 'spock') ||
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'rock' && houseChoice === 'lizard') ||
    (userChoice === 'scissors' && houseChoice === 'paper') ||
    (userChoice === 'scissors' && houseChoice === 'lizard') ||
    (userChoice === 'lizard' && houseChoice === 'spock') ||
    (userChoice === 'lizard' && houseChoice === 'paper') ||
    (userChoice === 'spock' && houseChoice === 'scissors') ||
    (userChoice === 'spock' && houseChoice === 'rock')
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
    localStorage.setItem('scoreBonus', userPoints);
  }, 1200);
  info.innerHTML = 'You Win!';
}
function draw() {
  info.innerHTML = "It's a Draw";
}
function lose() {
  setTimeout(() => {
    if (userPoints > 0) userPoints--;
    localStorage.setItem('scoreBonus', userPoints);
  }, 1200);
  info.innerHTML = 'You Lose...';
}

function resetPoints() {
  userPoints = 0;
}

iconReset.addEventListener('click', () => {
  userPoints = 0;
  localStorage.setItem('scoreBonus', 0);
});
