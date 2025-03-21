window.onload = () => {
  const user = "david";
  const password = "1234";
  const userValue = document.getElementById("username");
  const passwordValue = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const form = document.getElementById("login-form");

  const login = () => {
    if (userValue.value == user && passwordValue.value == password) {
      localStorage.setItem("isLogged", 1);
      localStorage.setItem("username", userValue.value);
      location.reload();
    } else {
      const credentialError = document.createElement("span");
      credentialError.innerText = "Your username or password is incorrect";
      credentialError.className = "mb-3 text-danger";
      form.insertBefore(credentialError, loginBtn);
    }
  };

  const logout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("username");
    location.reload();
  };

  const checkIfLogged = () => {
    if (localStorage.getItem("isLogged")) {
      createLogBoard();
    }
  };

  const createLogBoard = () => {
    form.innerHTML = "";
    const welcome = document.createElement("h1");
    welcome.innerText = "Welcome " + localStorage.getItem("username");
    welcome.className = "m-4";
    const logoutBtn = document.createElement("input");
    logoutBtn.type = "button";
    logoutBtn.className = "btn btn-primary btn-lg mt-2 mb-4";
    logoutBtn.value = "Log out";
    logoutBtn.id = "logout-btn";
    form.appendChild(welcome);
    form.appendChild(logoutBtn);
    logoutBtn.addEventListener("click", logout);
  };

  loginBtn.addEventListener("click", login);

  checkIfLogged();
};
