const message = document.getElementById("messsage");
const messageContainer = document.getElementById("message-container");
const simonButtons = document.querySelectorAll(".simon-btn");
const playAgainButton = document.getElementById("play-again-btn");

const colors = ["red", "green", "yellow", "blue"];
let colorsRandomized = [];
let numberOfColors = 3;
let count = 0;

const randomizeColors = () => {
  for (let i = 0; i < numberOfColors; i++) {
    let randomPosition = Math.floor(Math.random() * numberOfColors);
    console.log(randomPosition);
    colorsRandomized.push(colors[randomPosition]);
  }
  console.log(colorsRandomized);
};

const checkColor = (event) => {
  console.log(event.target.id);
};

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function playSequence() {
  console.log("Mostrando secuencia:", colorsRandomized);
  const flashDuration = 1300;
  const pauseDuration = 1300;
  for (const color of colorsRandomized) {
    const colorBox = document.getElementById(color);
    if (colorBox) {
      colorBox.classList.add("pressed");
      await wait(flashDuration);
      colorBox.classList.remove("pressed");
      await wait(pauseDuration);
    }
  }
}

const addListeners = () => {
  simonButtons.forEach((btn) => {
    btn.addEventListener("click", checkColor);
  });
  playAgainButton.addEventListener("click", playSequence);
};

randomizeColors();
addListeners();
