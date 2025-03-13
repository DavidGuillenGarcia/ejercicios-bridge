window.onload = () => {
  const jokeBtn = document.getElementById("fetchJoke");
  const jokesContainer = document.getElementById("jokeList");
  const clearDeletedJokes = document.getElementById("clearStoredJokes");

  let jokesArray = [];

  const fetchAJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        jokesArray.push(data.value);
        createAJoke(data.value, data.id);

        let deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", deleteJoke);
        });
      });
  };

  const createAJoke = (joke) => {
    let newJoke = `<div class='my-3 mt-5 d-flex flex-column joke-card shadow rounded rounded-3 py-3 px-4'><span class='fs-5 mb-3'>${joke}</span><div class='buttons d-flex justify-content-center'><input type='button' class='btn btn-danger deleteBtn' value='Delete joke'/></div></div>`;
    jokesContainer.innerHTML += newJoke;
    saveJoke();
  };

  const deleteJoke = (event) => {
    let jokeText = event.target.name;
    let jokeCardContainer = document.getElementById(jokeText);
    jokeCardContainer.remove();
  };

  const listStoragedJokes = () => {
    console.log("Entra");
    jokesArray.forEach((joke) => {
      createAJoke(joke);
    });
  };

  const deleteStoredJokes = () => {
    localStorage.removeItem("storedJokes");
  };

  const saveJoke = () => {
    localStorage.setItem("storedJokes", JSON.stringify(jokesArray));
  };

  if (localStorage.getItem("storedJokes")) {
    const storagedJokes = JSON.parse(localStorage.getItem("storedJokes"));
    jokesArray = storagedJokes;
    listStoragedJokes();
  }

  jokeBtn.addEventListener("click", fetchAJoke);
  clearDeletedJokes.addEventListener("click", deleteStoredJokes);
};
