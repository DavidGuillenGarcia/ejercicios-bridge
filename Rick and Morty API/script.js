window.onload = () => {
  const list = document.getElementById("characterList");
  const searchbar = document.getElementById("searchbar");
  const next = document.getElementById("next");

  const previous = document.getElementById("previous");
  previous.classList.add("hidden");

  const baseURL = "https://rickandmortyapi.com/api/character/";
  let index = 1;
  let pageLength = 0;

  const fetchCharacters = () => {
    if (searchbar.value == "") {
      getAllCharactersDebounce();
    } else {
      searchDebounce();
    }
  };

  const createCharacter = (id, name, image, origin, status) => {
    const newCharacterContainer = `<div id="${id}" 
        class="characterContainer card card-body m-2 p-3 shadow bg-dark text-white d-flex align-items-center">
        <h1 class="my-3 p-2">${name}</h1>
        <img src="${image}" class="images rounded rounded-3" />
        <span class="fs-5 mt-2 p-1">Origin: ${origin}</span>
        <span class="fs-5 mt-2 p-1">Status of the character: ${status}</span>
      </div>`;
    list.innerHTML += newCharacterContainer;
  };

  const getAllCharacters = (index) => {
    clearList();
    fetch(baseURL + "?page=" + index)
      .then((response) => response.json())
      .then((data) => {
        pageLength = data.info.pages;
        let characters = data.results;

        characters.forEach((character) => {
          createCharacter(
            character.id,
            character.name,
            character.image,
            character.origin.name,
            character.status
          );
        });
      });
  };

  const searchCharacter = () => {
    if (searchbar.value.length >= 3) {
      clearList();
      fetch(baseURL + "?name=" + searchbar.value)
        .then((response) => response.json())
        .then((data) => {
          let characters = data.results;

          characters.forEach((character) => {
            createCharacter(
              character.id,
              character.name,
              character.image,
              character.origin.name,
              character.status
            );
          });
        });
    } else if (searchbar.value == "") {
      getAllCharactersDebounce();
    }
  };

  const clearList = () => {
    list.innerHTML = "";
  };

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
    previous.classList.remove("hidden");
    next.classList.remove("hidden");
    if (page == 1) {
      previous.classList.add("hidden");
    } else if (page == pageLength) {
      next.classList.add("hidden");
    }
  };

  const previousPage = () => {
    index--;
    clearList();
    getAllCharacters(index);
    checkButtons(index, pageLength);
  };

  const nextPage = () => {
    index++;
    clearList();
    getAllCharacters(index);
    checkButtons(index, pageLength);
  };

  const searchDebounce = debounce(searchCharacter, 900);
  const getAllCharactersDebounce = debounce(getAllCharacters, 100);

  searchbar.addEventListener("input", fetchCharacters);
  next.addEventListener("click", nextPage);
  previous.addEventListener("click", previousPage);

  fetchCharacters();
};
