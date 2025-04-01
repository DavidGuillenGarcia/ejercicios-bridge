// --- Elementos del DOM ---
const gameBoard = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const pairsFoundDisplay = document.getElementById("pairs-found");
const totalPairsDisplay = document.getElementById("total-pairs");
const playAgainButton = document.getElementById("playAgainButton");
const message = document.getElementById("message");
const hint = document.getElementById("hint");
const theme = document.getElementById("theme");
const timeLeftContainer = document.getElementById("time-left");

// --- Variables del Juego ---
// Usamos emojis para que sea más visual y divertido
const cardSymbols = [
  ["🍎", "🍌", "🍇", "🍓", "🍒", "🍑", "🍍", "🥝"],
  ["🍕", "🍔", "🍟", "🍦", "🍩", "🍪", "🍣", "🌮"],
  ["🐶", "🐱", "🐦", "🦊", "🐻", "🐼", "🦁", "🐯"],
];
let cards = []; // Array para guardar la información de cada carta
let flippedCards = []; // Almacena las 2 cartas volteadas temporalmente
let matchedPairs = 0;
let moves = 0;
let lockBoard = false; // Bloquea el tablero mientras se comparan o voltean cartas
let totalPairs = cardSymbols[0].length;
let MAX_MOVES = 25;
let currentTheme = 0;
const MAX_TIME = 120;
let timeLeft = MAX_TIME;
let currentTime;
let lastTime = Date.now();

// --- Funciones ---

// Barajar un array (Algoritmo Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Intercambio moderno
  }
  console.log(array);
  return array;
}

// Crear el tablero de juego
function createBoard() {
  // Duplica los símbolos para tener pares y barájalos
  const shuffledSymbols = shuffle([
    ...cardSymbols[currentTheme],
    ...cardSymbols[currentTheme],
  ]);
  totalPairsDisplay.textContent = totalPairs; // Muestra el total de pares
  gameBoard.innerHTML = ""; // Limpia el tablero anterior

  shuffledSymbols.forEach((symbol) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    // Guardamos el símbolo en un atributo data-* para fácil acceso
    cardElement.dataset.symbol = symbol;

    // Crear caras de la carta
    cardElement.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">${symbol}</div>
        `;

    // Añadir evento de clic
    cardElement.addEventListener("click", handleCardClick);

    gameBoard.appendChild(cardElement);
    cards.push(cardElement); // Guarda la referencia al elemento
  });
}

// Manejar el clic en una carta
function handleCardClick() {
  // Ignora clics si el tablero está bloqueado, la carta ya está volteada o emparejada
  if (
    lockBoard ||
    this.classList.contains("is-flipped") ||
    flippedCards.length >= 2
  ) {
    return;
  }

  const clickedCard = this;
  clickedCard.classList.add("is-flipped");
  flippedCards.push(clickedCard);

  // Si se han volteado dos cartas
  if (flippedCards.length === 2) {
    lockBoard = true; // Bloquea el tablero
    incrementMoves();
    checkForMatch();
  }
}

// Comprobar si las dos cartas volteadas coinciden
function checkForMatch() {
  const [card1, card2] = flippedCards;
  const symbol1 = card1.dataset.symbol;
  const symbol2 = card2.dataset.symbol;

  if (symbol1 === symbol2) {
    currentTime = Date.now();
    console.log(currentTime);
    console.log(lastTime);
    let diference = currentTime - lastTime;
    if (diference <= 3000) {
      console.log("Entra");
      hint.style.display = "inline-block";
      hint.innerText = "¡Rápido! ✨";
      setTimeout(() => {
        hint.style.display = "none";
      }, 1000);
    }
    lastTime = Date.now();
    disableCards();
  } else {
    // No es un par
    unflipCards();
    checkLostCondition();
  }
}

// Marcar las cartas como emparejadas y desbloquear
function disableCards() {
  flippedCards.forEach((card) => {
    card.classList.add("is-matched");
    card.innerHTML = card.dataset.symbol;
  });
  matchedPairs++;
  pairsFoundDisplay.textContent = matchedPairs;
  resetFlippedCards();
  checkWinCondition();
}

// Voltear las cartas de nuevo si no coinciden (con un retraso)
function unflipCards() {
  hint.style.display = "inline-block";
  hint.innerText = "¡Oh no! No coinciden 😢";
  setTimeout(() => {
    flippedCards.forEach((card) => card.classList.remove("is-flipped"));
    resetFlippedCards();
    hint.style.display = "none";
  }, 1000); // Retraso de 1 segundo para ver las cartas
}

// Limpiar el array de cartas volteadas y desbloquear tablero
function resetFlippedCards() {
  flippedCards = [];
  lockBoard = false;
}

// Incrementar el contador de movimientos
function incrementMoves() {
  moves++;
  movesDisplay.textContent = moves;
}

// Comprobar si se han encontrado todos los pares
function checkWinCondition() {
  if (matchedPairs === totalPairs) {
    setMessage("¡Felicidades! ¡Has encontrado todos los pares!", "correct");
    playAgainButton.style.display = "inline-block";
  }
}

const checkLostCondition = () => {
  if (moves == MAX_MOVES) {
    setMessage("Has perdido, se te han acabado los movimientos", "wrong");
    playAgainButton.style.display = "inline-block";
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.removeEventListener("click", handleCardClick);
    });
  } else if (timeLeft == 0) {
    setMessage("Has perdido, se te han acabado el tiempo", "wrong");
    playAgainButton.style.display = "inline-block";
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.removeEventListener("click", handleCardClick);
    });
  }
};

const checkTheme = (event) => {
  currentTheme = event.target.value;
  startGame();
};

const checkTimer = () => {
  timeLeft--;
  timeLeftContainer.innerText = timeLeft;
  if (timeLeft == 0) {
    clearInterval(setTimer);
    checkLostCondition();
  }
};

const setTimer = setInterval(checkTimer, 1000);

const setMessage = (messageText, type) => {
  message.style.display = "block";
  message.classList.add(type);
  message.innerText = messageText;
};

// Iniciar o reiniciar el juego
function startGame() {
  // Resetear variables
  timeLeft = MAX_TIME;
  timeLeftContainer.innerText = MAX_TIME;
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  cards = [];
  lockBoard = false;

  // Resetear UI
  movesDisplay.textContent = moves;
  pairsFoundDisplay.textContent = matchedPairs;
  message.style.display = "none";
  playAgainButton.style.display = "none";

  // Crear nuevo tablero
  createBoard();
}

// --- Event Listeners ---
theme.addEventListener("change", checkTheme);
playAgainButton.addEventListener("click", startGame);

// --- Iniciar el juego al cargar la página ---
startGame();
