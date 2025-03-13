window.onload = () => {
  const jokeBtn = document.getElementById("fetchJoke");
  const jokesContainer = document.getElementById("jokeList");
  const clearDeletedJokes = document.getElementById("clearStoredJokes");

  let jokesArray = [];

  const fetchAJoke = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        saveJoke(data.value);
        listStoragedJokes();
      });
  };

  const saveJoke = (value) => {
    jokesArray.push(value);
    localStorage.setItem("storedJokes", JSON.stringify(jokesArray));
  };

  const deleteJoke = (event) => {
    let jokeId = event.target.name;
    console.log(jokeId);
    let newJokeArray = jokesArray.splice(1, jokeId);
    console.log(newJokeArray);
    localStorage.setItem("storedJokes", JSON.stringify(newJokeArray));

    if (JSON.parse(localStorage.getItem("storedJokes")).length > 0) {
      console.log("Entra");
      listStoragedJokes();
    } else {
      jokesContainer.innerHTML = "";
    }
  };

  const listStoragedJokes = () => {
    let index = 0;
    jokesContainer.innerHTML = "";
    let newJokeArray = JSON.parse(localStorage.getItem("storedJokes"));
    newJokeArray.forEach((joke) => {
      let newJoke = `<div class='my-3 mt-5 d-flex flex-column joke-card shadow rounded rounded-3 py-3 px-4'><span class='fs-5 mb-3'>${joke}</span><div class='buttons d-flex justify-content-center'><input type='button' class='btn btn-danger deleteBtn' name='${index++}' value='Delete joke'/></div></div>`;
      jokesContainer.innerHTML += newJoke;
    });
    let deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteJoke);
    });
  };

  if (localStorage.getItem("storedJokes")) {
    const storagedJokes = JSON.parse(localStorage.getItem("storedJokes"));
    jokesArray = storagedJokes;
    listStoragedJokes();
  }
  const deleteStoredJokes = () => {
    localStorage.removeItem("storedJokes");
    jokesContainer.innerHTML = "";
  };

  jokeBtn.addEventListener("click", fetchAJoke);
  clearDeletedJokes.addEventListener("click", deleteStoredJokes);
};
