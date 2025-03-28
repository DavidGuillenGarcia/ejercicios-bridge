const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const messageContainer = document.getElementById("message-container");
const attemptsInfo = document.getElementById("attempts");
const playAgainButton = document.getElementById("playAgainButton");
const attemptList = document.getElementById("guessesList");
const previousGuessesContainer = document.getElementById("previous-guesses");
const dificulty = document.getElementById("dificulty");
const spanDificulty = document.getElementById("stored-dificulty");
const myModal = document.getElementById("myModal");
const puntuation = document.getElementById("puntuation");
const record = document.getElementById("record");

let secretNumber;
let attempts;
let dificultyStored = "medium";
let attemptsArray = [];
let MIN_NUMBER = 1;
let MAX_NUMBER = 100;
const MAX_ATTEMPTS = 10;
let storagedRecord;

const setDificulty = (event) => {
  dificultyStored = event.target.value;

  if (event.target.value == "low") {
    MAX_NUMBER = 50;
    document.getElementById("max-number").textContent = MAX_NUMBER;
    console.log(MAX_NUMBER);
  }
  if (event.target.value == "medium") {
    MAX_NUMBER = 100;
    document.getElementById("max-number").textContent = MAX_NUMBER;
    console.log(MAX_NUMBER);
  }
  if (event.target.value == "hard") {
    MAX_NUMBER = 200;
    document.getElementById("max-number").textContent = MAX_NUMBER;
    console.log(MAX_NUMBER);
  }
  startGame();
};

function startGame() {
  secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  attempts = 0;
  attemptsArray = [];
  previousGuessesContainer.classList.add("hidden");
  messageContainer.classList.add("hidden");
  attemptsInfo.classList.add("hidden");
  message.textContent = "";
  message.className = "message";
  attemptsInfo.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.classList.remove("hidden");
  guessInput.focus();

  console.log(`Pssst... el número secreto es ${secretNumber}`);
}

const listAttemps = () => {
  previousGuessesContainer.classList.remove("hidden");
  attemptList.innerHTML = "";
  console.log(attemptsArray);
  attemptsArray.forEach((attempt, index) => {
    if (index == 0) {
      attemptList.innerText += `${attempt}`;
    } else {
      attemptList.innerText += `, ${attempt}`;
    }
  });
};

function handleGuess() {
  const userGuessText = guessInput.value;

  if (userGuessText === "") {
    setMessage("Por favor, introduce un número.", "info");
    return;
  }

  const userGuess = parseInt(userGuessText);

  isTheAttemptNaN(userGuess);
  isTheAtttempRepeated(userGuess);

  handleWin(userGuess);
  isTheAtttempLowerOrHigher(userGuess);

  if (userGuess !== secretNumber) {
    guessInput.value = "";
    guessInput.focus();
  }
}

function setMessage(msg, type) {
  messageContainer.classList.remove("hidden");
  message.textContent = msg;
  message.className = `message ${type}`;
}

function endGame() {
  guessInput.disabled = true;
  guessButton.disabled = true;
  playAgainButton.style.display = "inline-block";
  if (!localStorage.getItem(dificultyStored)) {
    if (attempts > Number(localStorage.getItem(dificultyStored))) {
      localStorage.setItem(dificultyStored, attempts);
    }
  }
}

const isTheAtttempRepeated = (guess) => {
  if (attemptsArray.includes(guess)) {
    setMessage(
      "¡Este número ya ha sido introducido! Vuelve a introducir uno diferente",
      "info"
    );
    guessInput.value = "";
    guessInput.focus();
  }
  return;
};

const isTheAttemptNaN = (guess) => {
  if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
    setMessage(
      `Introduce un número válido entre ${MIN_NUMBER} y ${MAX_NUMBER}.`,
      "info"
    );

    guessInput.value = "";
    guessInput.focus();
  }
  return;
};

const isTheAtttempLowerOrHigher = (guess) => {
  if (guess < secretNumber && !attemptsArray.includes(guess)) {
    addAnAttempt();
    attemptsInfo.classList.remove("hidden");
    attemptsArray.push(guess);
    listAttemps();
    setMessage("¡Demasiado bajo! Intenta un número más alto. 👇", "wrong");
    handleLost(guess);
  } else if (guess > secretNumber && !attemptsArray.includes(guess)) {
    addAnAttempt();
    attemptsInfo.classList.remove("hidden");
    attemptsArray.push(guess);
    listAttemps();
    setMessage("¡Demasiado alto! Intenta un número más bajo. 👆", "wrong");
    handleLost(guess);
  }
};

const addAnAttempt = () => {
  attempts++;
  attemptsInfo.textContent = `Intentos: ${attempts}`;
};

const handleWin = (guess) => {
  if (guess === secretNumber) {
    addAnAttempt();
    attemptsInfo.classList.remove("hidden");
    setMessage(
      `¡Correcto! 🎉 El número era ${secretNumber}. Lo adivinaste en ${attempts} intentos.`,
      "correct"
    );
    endGame();
    if (localStorage.getItem(dificultyStored)) {
      storagedRecord = JSON.parse(localStorage.getItem(dificultyStored));
    }

    puntuation.innerText = attempts;
    spanDificulty.innerText = dificultyStored;
    if (attempts < storagedRecord) {
      record.innerText =
        "Enhorabuena has superado el previo record de " +
        storagedRecord +
        " intentos en la dificultad " +
        dificultyStored;
      localStorage.setItem(dificultyStored, attempts);
    } else if (attempts > storagedRecord) {
      record.innerText =
        "Lamentablemente no has superado el previo record de " +
        storagedRecord +
        " intentos en la dificultad " +
        dificultyStored;
    }
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
  }
};

const handleLost = (guess) => {
  if (attempts == MAX_ATTEMPTS) {
    attemptsArray.push(guess);
    listAttemps();
    setMessage(
      `Has llegado al límite de intentos y has perdido 😢. El número era ${secretNumber}.`,
      "wrong"
    );
    endGame();
  }
};

guessButton.addEventListener("click", handleGuess);
guessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleGuess();
  }
});

dificulty.addEventListener("change", setDificulty);
playAgainButton.addEventListener("click", startGame);

startGame();
