window.onload = () => {
  const restartBtn = document.getElementById("btnReestablecer");
  const changeBackgroundBtn = document.getElementById("btnChangeBackground");
  const count = document.getElementById("contadorVisitas");
  let randomColor = "";
  let colorLength = 6;

  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

  const checkBgColor = () => {
    if (localStorage.getItem("bgColor")) {
      document.body.style.backgroundColor =
        "#" + localStorage.getItem("bgColor");
    }
  };

  const addAView = () => {
    if (!localStorage.getItem("views")) {
      localStorage.setItem("views", 1);
      count.innerText = localStorage.getItem("views");
    } else {
      let storedViews = localStorage.getItem("views");
      storedViews++;
      count.innerText = storedViews;
      localStorage.setItem("views", storedViews);
    }
  };

  const deleteViews = () => {
    localStorage.removeItem("views");
    count.innerText = 0;
  };

  const changeToRandomColor = () => {
    localStorage.setItem("bgColor", "");
    for (let i = 1; i <= colorLength; i++) {
      let randomNumber = Math.floor(Math.random() * 16);
      randomColor = randomColor + colors[randomNumber];
    }
    localStorage.setItem("bgColor", randomColor);
    checkBgColor();
    randomColor = "";
  };

  restartBtn.addEventListener("click", deleteViews);
  changeBackgroundBtn.addEventListener("click", changeToRandomColor);

  addAView();
  checkBgColor();
};
