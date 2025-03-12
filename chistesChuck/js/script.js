window.onload = () => {
  const jokeBtn = document.getElementById("fetchJoke");
  const jokesContainer = document.getElementById("jokeList");
  const clearDeletedJokes = document.getElementById("clearStoragedJokes");
  let joke = {
    id: "",
    text: "",
  };

  const fetchAJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        createAJoke(data.value, data.id);

        let deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", deleteJoke);
        });
      });
  };

  const createAJoke = (joke, jokeId) => {
    let newJoke = `<div id='${jokeId}' class='my-3 mt-5 d-flex flex-column joke-card shadow rounded rounded-3 py-3 px-4'><span class='fs-5 mb-3'>${joke}</span><div class='buttons d-flex justify-content-center'><input type='button' class='btn btn-danger deleteBtn' name='${jokeId}' value='Delete joke'/></div></div>`;
    jokesContainer.insertAdjacentHTML("beforeend", newJoke);
    if (!localStorage.getItem("storagedJokes")) {
      localStorage.setItem("storagedJokes", jokeId);
    } else {
      let jokeList = localStorage.getItem("storagedJokes");
      localStorage.setItem("storagedJokes", jokeList + "." + jokeId);
    }
  };

  const deleteJoke = (event) => {
    let jokeId = event.target.name;
    let jokeCardContainer = document.getElementById(jokeId);

    jokeCardContainer.remove();
  };

  const deleteStoredJokes = () => {
    localStorage.removeItem("storagedJokes");
  };

  const updateStorageList = (jokeId) => {
    let jokeList = localStorage.getItem("storagedJokes");
    let jokeArray = jokeList.split(".");
    let updatedList = jokeArray.filter((joke) => joke != jokeId);
  };

  const createStoredJokes = () => {};

  jokeBtn.addEventListener("click", fetchAJoke);
  clearDeletedJokes.addEventListener("click", deleteStoredJokes);

  createStoredJokes();
};
