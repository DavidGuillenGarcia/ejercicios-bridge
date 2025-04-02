const message = document.getElementById("message");
const messageContainer = document.getElementById("message-container");
const simonButtons = document.querySelectorAll(".simon-btn");
const startButton = document.getElementById("start-btn");
const playSequenceButton = document.getElementById("start-sequence-btn");
const levelContainer = document.getElementById("level-container");
const level = document.getElementById("level");
const dificulty = document.getElementById("dificulty");
const username = document.getElementById("username");
const userForm = document.getElementById("simon-form");
const simonContainer = document.getElementById("simon-btn-group");

const colors = ["red", "green", "yellow", "blue"];
let colorsRandomized = [];
console.log(colorsRandomized.length);
let numberOfColors = 3;
let count = 0;
let guessedCount = 0;
let currentLevel = 1;
let currentDificulty = 5;

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
      checkWin();
      removeListeners();
    }
  } else {
    setMessage("Wrong color better luck next time", "wrong");
    startButton.classList.remove("hidden");
    playSequenceButton.classList.add("hidden");
    removeListeners();
  }
};

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function playSequence() {
  level.innerText = currentLevel;
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
  if (currentLevel === currentDificulty) {
    level.innerText = currentLevel;
    setMessage("You successfully complete all the levels!", "correct");
    playSequenceButton.classList.add("hidden");
    startButton.classList.remove("hidden");
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

const checkDificulty = (event) => {
  currentDificulty = event.target.value;
  console.log(currentDificulty);
};

const createUser = () => {
  localStorage.setItem("Username", username.value);
  startButton.removeEventListener("click", createUser);
  startButton.addEventListener("click", startGame);
  simonContainer.classList.remove("hidden");
  userForm.classList.add("hidden");
  userForm.classList.remove("d-flex");
  startGame();
};

const startGame = () => {
  startButton.value = "Play again";
  messageContainer.classList.add("hidden");
  startButton.classList.add("hidden");
  playSequenceButton.classList.remove("hidden");
  levelContainer.classList.remove("hidden");
  level.innerText = 1;
  colorsRandomized = [];
  numberOfColors = 3;
  currentLevel = 1;
  randomizeColors();
  playSequenceButton.addEventListener("click", playSequence);
};

startButton.addEventListener("click", createUser);
dificulty.addEventListener("change", checkDificulty);
