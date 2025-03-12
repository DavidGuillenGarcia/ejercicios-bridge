window.onload = () => {
  const jokeBtn = document.getElementById("fetchJoke");
  const jokesContainer = document.getElementById("jokeList");
  const clearDeletedJokes = document.getElementById("clearDeletedJokes");

  const fetchAJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        if (localStorage.getItem("deletedJokes")) {
          let deletedJokes = localStorage.getItem("deletedJokes");
          let array = deletedJokes.split(".");
          array.forEach((item) => {
            if (array.includes(data.id)) {
            } else {
              createAJoke(data.value, data.id);
            }
          });
        } else {
          createAJoke(data.value, data.id);
        }
        let deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", deleteJoke);
        });
      });
  };

  const createAJoke = (joke, jokeId) => {
    let newJoke = `<div id='${jokeId}' class='my-3 mt-5 d-flex flex-column joke-card shadow rounded rounded-3 py-3 px-4'><span class='fs-5 mb-3'>${joke}</span><div class='buttons d-flex justify-content-center'><input type='button' class='btn btn-danger deleteBtn' name='${jokeId}' value='Delete joke'/></div></div>`;
    jokesContainer.insertAdjacentHTML("beforeend", newJoke);
  };

  const deleteJoke = (event) => {
    let jokeId = event.target.name;
    let jokeCardContainer = document.getElementById(jokeId);
    if (!localStorage.getItem("deletedJokes")) {
      localStorage.setItem("deletedJokes", jokeId);
      jokeCardContainer.remove();
    } else {
      let jokeList = localStorage.getItem("deletedJokes");
      localStorage.setItem("deletedJokes", jokeList + "." + jokeId);
      jokeCardContainer.remove();
    }
  };

  const deleteStoredJokes = () => {
    localStorage.removeItem("deletedJokes");
  };

  jokeBtn.addEventListener("click", fetchAJoke);
  clearDeletedJokes.addEventListener("click", deleteStoredJokes);
};
