window.onload = () => {
  const user = "david";
  const password = "1234";
  const userValue = document.getElementById("username");
  const passwordValue = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const form = document.getElementById("content");

  logoutBtn.style.visibility = "hidden";

  const login = () => {
    if (userValue.value == user && passwordValue.value == password) {
      localStorage.setItem("isLogged", 1);
      location.reload();
    } else {
      alert("Las credenciales son incorrectas");
    }
  };

  const logout = () => {
    localStorage.removeItem("isLogged");
    location.reload();
  };

  const checkIfLogged = () => {
    if (localStorage.getItem("isLogged")) {
      form.style.visibility = "hidden";
      logoutBtn.style.visibility = "visible";
    }
  };

  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);

  checkIfLogged();
};
