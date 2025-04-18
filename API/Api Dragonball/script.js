window.onload = () => {
  const list = document.getElementById("characterList");
  const searchbar = document.getElementById("searchbar");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const gender = document.getElementById("genderSelect");
  const race = document.getElementById("raceSelect");
  const affiliation = document.getElementById("affiliationSelect");
  const myModal = document.getElementById("myModal");

  let actualPage = 1;
  previous.style.visibility = "hidden";

  const fetchCharacters = () => {
    if (searchbar.value == "") {
      getAllCharactersDebounce();
    } else {
      searchDebounce();
    }
  };

  const createCharacter = (id, name, image, race, ki, description) => {
    const newCharacterContainer = document.createElement("div");
    newCharacterContainer.id = id;
    newCharacterContainer.style.cursor = "pointer";
    newCharacterContainer.className =
      "characterContainer card card-body m-2 p-3 shadow bg-dark text-white d-flex align-items-center";
    list.appendChild(newCharacterContainer);
    const characterName = document.createElement("h1");
    const characterImage = document.createElement("img");
    const characterRace = document.createElement("span");
    const characterKi = document.createElement("span");
    const characterDescription = document.createElement("p");
    characterName.textContent = name;
    characterImage.src = image;
    characterName.className = "my-3 p-2";
    characterImage.className = "images";
    characterRace.className = "fs-5 mt-2 p-1";
    characterKi.className = "fs-5 mt-1 p-1";
    characterDescription.className = " fs-6 p-3";
    characterRace.textContent = "Race: " + race;
    characterKi.textContent = "Quantity of ki: " + ki;
    characterDescription.textContent = description;
    newCharacterContainer.appendChild(characterName);
    newCharacterContainer.appendChild(characterImage);
    newCharacterContainer.appendChild(characterRace);
    newCharacterContainer.appendChild(characterKi);
    newCharacterContainer.appendChild(characterDescription);
    newCharacterContainer.addEventListener("click", () =>
      getPlanetFromCharacter(id)
    );
  };

  const getAllCharacters = () => {
    clearList();
    fetch(
      "https://dragonball-api.com/api/characters?page=" +
        actualPage +
        "&limit=5"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.items.length; i++) {
          createCharacter(
            data.items[i].id,
            data.items[i].name,
            data.items[i].image,
            data.items[i].race,
            data.items[i].ki,
            data.items[i].description
          );
        }
        console.log(data.meta.totalPages);
        checkButtons(actualPage, data.meta.totalPages);
      });
  };

  const searchCharacter = () => {
    console.log(searchbar.value.length);
    if (searchbar.value.length >= 3) {
      clearList();
      fetch("https://dragonball-api.com/api/characters?name=" + searchbar.value)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            createCharacter(
              data.items[i].id,
              data[i].name,
              data[i].image,
              data[i].race,
              data[i].ki,
              data[i].description
            );
          }
        });
    } else if (searchbar.value == "") {
      getAllCharactersDebounce();
    }
  };

  const clearList = () => {
    list.innerHTML = "";
  };

  searchbar.addEventListener("input", fetchCharacters);

  const debounce = (mainFunction, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const checkButtons = (page, pageLength) => {
    previous.style.visibility = "visible";
    previous.style.visibility = "visible";
    if (page == 1) {
      previous.style.visibility = "hidden";
    } else if (page == pageLength) {
      next.style.visibility = "hidden";
    }
  };

  const previousPage = () => {
    actualPage = actualPage - 1;
    clearList();
    fetch(
      "https://dragonball-api.com/api/characters?page=" +
        actualPage +
        "&limit=5"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.items.length; i++) {
          createCharacter(
            data.items[i].id,
            data.items[i].name,
            data.items[i].image,
            data.items[i].race,
            data.items[i].ki,
            data.items[i].description
          );
        }

        console.log(data.meta.totalPages);
        checkButtons(actualPage, data.meta.totalPages);
      });
  };

  const nextPage = () => {
    actualPage = actualPage + 1;
    clearList();
    fetch(
      "https://dragonball-api.com/api/characters?page=" +
        actualPage +
        "&limit=5"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.items.length; i++) {
          createCharacter(
            data.items[i].id,
            data.items[i].name,
            data.items[i].image,
            data.items[i].race,
            data.items[i].ki,
            data.items[i].description
          );
        }

        console.log(data.meta.totalPages);
        checkButtons(actualPage, data.meta.totalPages);
      });
  };

  const filterValue = (event) => {
    console.log(gender.value);
    clearList();
    let filter = event.target.getAttribute("name");
    if (event.target.value == "-") {
      getAllCharacters();
    } else {
      fetch(
        "https://dragonball-api.com/api/characters?" +
          filter +
          "=" +
          event.target.value
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            createCharacter(
              data.items[i].id,
              data[i].name,
              data[i].image,
              data[i].race,
              data[i].ki,
              data[i].description
            );
          }
        });
    }
  };

  const getPlanetFromCharacter = (id) => {
    fetch("https://dragonball-api.com/api/characters/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.originPlanet);
        const planet = data.originPlanet;
        document.getElementById("planetName").textContent = planet.name;
        document.getElementById("planetImage").src = planet.image;
        document.getElementById("planetDescription").textContent =
          planet.description;

        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
      });
  };

  next.addEventListener("click", nextPage);

  previous.addEventListener("click", previousPage);

  gender.addEventListener("change", filterValue);

  race.addEventListener("change", filterValue);

  affiliation.addEventListener("change", filterValue);

  const searchDebounce = debounce(searchCharacter, 900);

  const getAllCharactersDebounce = debounce(getAllCharacters, 100);

  fetchCharacters();
};
