window.onload = () => {
  const restartBtn = document.getElementById("btnReestablecer");
  const count = document.getElementById("contadorVisitas");
  let randomColor = "";

  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

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
    for (let i = 1; i <= 6; i++) {
      let randomNumber = Math.floor(Math.random() * 16);
      randomColor = randomColor + colors[randomNumber];
    }
    document.body.style.backgroundColor = "#" + randomColor;
  };

  restartBtn.addEventListener("click", deleteViews);

  addAView();
  changeToRandomColor();
};
