const toppings = ['🧀', '🍧', '🌽', '❌', '🎁'];
const scores = {'🧀': 5, '🍧': 5, '🌽': 5, '❌': -3, '🎁': 10};

let score = 0;
let timeLeft = 20;
let gameInterval, timerInterval;
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const targetArea = document.getElementById('target-area');
const endMessage = document.getElementById('end-message');
const startButton = document.getElementById('start-button');
const hitSound = document.getElementById('hit-sound');

function randomPosition() {
  const x = Math.random() * (targetArea.clientWidth - 50);
  const y = Math.random() * (targetArea.clientHeight - 50);
  return { x, y };
}

function spawnTopping() {
  const topping = document.createElement('div');
  topping.className = 'topping';
  const emoji = toppings[Math.floor(Math.random() * toppings.length)];
  topping.textContent = emoji;
  const pos = randomPosition();
  topping.style.left = pos.x + 'px';
  topping.style.top = pos.y + 'px';

  topping.onclick = () => {
    score += scores[emoji] || 0;
    scoreEl.textContent = 'Skor: ' + score;
    hitSound.currentTime = 0;
    hitSound.play();
    topping.remove();
  };

  targetArea.appendChild(topping);

  setTimeout(() => topping.remove(), 1000);
}

function startGame() {
  score = 0;
  timeLeft = 20;
  scoreEl.textContent = 'Skor: 0';
  timerEl.textContent = 'Waktu: 20';
  endMessage.textContent = '';
  startButton.disabled = true;

  gameInterval = setInterval(spawnTopping, 500);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = 'Waktu: ' + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  targetArea.innerHTML = '';
  endMessage.textContent = score >= 50 ? 'Kamu Master Topping! 🎉' : 'Coba lagi yuk! 😄';
  startButton.disabled = false;
}

startButton.onclick = startGame;
