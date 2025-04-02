const message = document.getElementById("message");
const messageContainer = document.getElementById("message-container");
const simonButtons = document.querySelectorAll(".simon-btn");
const playAgainButton = document.getElementById("play-again-btn");
const playSequenceButton = document.getElementById("start-btn");
const levelContainer = document.getElementById("level-container");
const level = document.getElementById("level");

const colors = ["red", "green", "yellow", "blue"];
let colorsRandomized = [];
console.log(colorsRandomized.length);
let numberOfColors = 3;
let count = 0;
let guessedCount = 0;
let currentLevel = 1;
const MAX_LEVEL = 5;

const randomizeColors = () => {
  if (colorsRandomized.length == 0) {
    for (let i = 0; i < numberOfColors; i++) {
      let randomPosition = Math.floor(Math.random() * numberOfColors);
      colorsRandomized.push(colors[randomPosition]);
    }
    console.log(colorsRandomized);
  } else {
    numberOfColors++;
    let newColor = Math.floor(Math.random() * colors.length);
    colorsRandomized.push(colors[newColor]);
    console.log(colorsRandomized);
  }
};

const checkColor = (event) => {
  if (event.target.id == colorsRandomized[guessedCount]) {
    console.log("Correcto");
    guessedCount++;
    if (colorsRandomized.length == guessedCount) {
      setMessage("You nailed the sequence!", "correct");
      messageContainer.classList.remove("hidden");
      randomizeColors();
      guessedCount = 0;
      currentLevel++;
      level.innerText = currentLevel;
      checkWin();
      removeListeners();
    }
  } else {
    setMessage("Wrong color better luck next time", "wrong");
    playAgainButton.classList.remove("hidden");
    playSequenceButton.classList.add("hidden");
    removeListeners();
  }
};

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function playSequence() {
  messageContainer.classList.add("hidden");
  removeListeners();
  const flashDuration = 600;
  const pauseDuration = 600;
  for (const color of colorsRandomized) {
    const colorBox = document.getElementById(color);
    if (colorBox) {
      colorBox.classList.add("pressed");
      await wait(flashDuration);
      colorBox.classList.remove("pressed");
      await wait(pauseDuration);
    }
  }
  addListeners();
}

const addListeners = () => {
  simonButtons.forEach((btn) => {
    btn.addEventListener("click", checkColor);
  });
};

const checkWin = () => {
  if (currentLevel === MAX_LEVEL) {
    setMessage("You successfully complete all the levels!", "correct");
    playSequenceButton.classList.add("hidden");
    playAgainButton.classList.remove("hidden");
  }
};

const setMessage = (messageText, type) => {
  message.innerText = messageText;
  messageContainer.classList.remove("hidden");
  message.classList.add(type);
};

const removeListeners = () => {
  simonButtons.forEach((btn) => {
    btn.removeEventListener("click", checkColor);
  });
};

const startGame = () => {
  messageContainer.classList.add("hidden");
  playAgainButton.classList.add("hidden");
  playSequenceButton.classList.remove("hidden");
  level.innerText = 1;
  colorsRandomized = [];
  numberOfColors = 3;
  currentLevel = 1;
  randomizeColors();
  playAgainButton.addEventListener("click", startGame);
  playSequenceButton.addEventListener("click", playSequence);
};

startGame();
