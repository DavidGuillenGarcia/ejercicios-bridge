window.onload = () => {
  const btn = document.getElementById("obtenerChiste");
  const chiste = document.getElementById("chiste");

  const contarChiste = () => {
    fetch("https://v2.jokeapi.dev/joke/Programming?lang=es")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.setup) {
          chiste.innerHTML = data.setup + "<br>" + data.delivery;
        } else {
          chiste.innerHTML = data.joke;
        }
      });
  };

  btn.addEventListener("click", contarChiste);
};
