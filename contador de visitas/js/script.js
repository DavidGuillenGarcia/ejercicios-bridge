window.onload = () => {
  const restartBtn = document.getElementById("btnReestablecer");
  const count = document.getElementById("contadorVisitas");

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

  restartBtn.addEventListener("click", deleteViews);

  addAView();
};
