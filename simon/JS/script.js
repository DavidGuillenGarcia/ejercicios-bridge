const message = document.getElementById("messsage");
const messageContainer = document.getElementById("message-container");
const simonButtons = document.querySelectorAll(".simon-btn");
const playAgainButton = document.getElementById("play-again-btn");
const playAgainContainer = document.getElementById("play-again-container");

const colors = ["red", "green", "yellow", "blue"];
let colorsRandomized = [];
let numberOfColors = 3;

const randomizeColors = () => {
  for (let i = 0; i < numberOfColors; i++) {
    let randomPosition = Math.floor(Math.random() * numberOfColors);
    console.log(randomPosition);
    colorsRandomized.push(colors[randomPosition]);
  }
  console.log(colorsRandomized);
};

randomizeColors();
