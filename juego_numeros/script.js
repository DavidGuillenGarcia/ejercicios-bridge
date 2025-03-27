const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const messageContainer = document.getElementById("message-container");
const attemptsInfo = document.getElementById("attempts");
const playAgainButton = document.getElementById("playAgainButton");
const attemptList = document.getElementById("guessesList");
const previousGuessesContainer = document.getElementById("previous-guesses");

let secretNumber;
let attempts;
let attemptsArray = [];
const MAX_NUMBER = 100;
const MIN_NUMBER = 1;

function startGame() {
  secretNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
  attempts = 0;

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

  if (isNaN(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
    setMessage(
      `Introduce un número válido entre ${MIN_NUMBER} y ${MAX_NUMBER}.`,
      "info"
    );

    guessInput.value = "";
    guessInput.focus();
    return;
  }

  attempts++;
  if (attempts >= 10) {
    endGame();
  }
  attemptsInfo.textContent = `Intentos: ${attempts}`;

  if (userGuess === secretNumber) {
    setMessage(
      `¡Correcto! 🎉 El número era ${secretNumber}. Lo adivinaste en ${attempts} intentos.`,
      "correct"
    );
    endGame();
  } else if (attempts == 5) {
    attemptsArray.push(userGuess);
    listAttemps();
    setMessage(
      `Has llegado al límite de intentos y has perdido 😢. El número era ${secretNumber}.`,
      "wrong"
    );
    endGame();
  } else if (userGuess < secretNumber) {
    attemptsArray.push(userGuess);
    listAttemps();
    setMessage("¡Demasiado bajo! Intenta un número más alto. 👇", "wrong");
  } else {
    attemptsArray.push(userGuess);
    listAttemps();
    setMessage("¡Demasiado alto! Intenta un número más bajo. 👆", "wrong");
  }

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
}

guessButton.addEventListener("click", handleGuess);
guessInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleGuess();
  }
});

playAgainButton.addEventListener("click", startGame);

startGame();
