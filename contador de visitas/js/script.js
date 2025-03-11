window.onload = () => {
  const restartBtn = document.getElementById("btnReestablecer");
  const count = document.getElementById("contadorVisitas");

  if (localStorage.getItem("views") > 0) {
    count.innerText = localStorage.getItem("views");
  }

  const addAView = () => {
    if (!localStorage.getItem("views")) {
      localStorage.setItem("views", 1);
    } else {
      let storedViews = JSON.parse(localStorage.getItem("views"));
      storedViews = storedViews + 1;
      localStorage.setItem("views", storedViews);
    }
  };

  const deleteViews = () => {
    localStorage.removeItem("views");
  };

  restartBtn.addEventListener("click", deleteViews);

  addAView();
};
