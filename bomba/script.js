window.onload = () => {
  const input = document.getElementById("number");
  const output = document.getElementById("output");
  const restart = document.getElementById("restartBtn");

  const startGame = () => {
    output.innerText = "";
    setTimer();
  };

  const setTimer = () => {
    checkNumbers(input.value, randomNumber());
  };

  const checkNumbers = (num1, num2) => {
    if (num1 == num2) {
      output.innerText = "Has acertado el número";
    } else {
      output.innerText = "La bomba ha explotado";
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      startGame();
    }
  });

  const randomNumber = () => {
    let randomNum = Math.floor(Math.random() * 3) + 1;
    return randomNum;
  };
};
