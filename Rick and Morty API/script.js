window.onload = () => {
  const list = document.getElementById("characterList");
  const searchbar = document.getElementById("searchbar");
  const next = document.getElementById("next");

  const previous = document.getElementById("previous");
  previous.classList.add("hidden");

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
    const newCharacterContainer = document.createElement("div");
    newCharacterContainer.id = id;
    newCharacterContainer.className =
      "characterContainer card card-body m-2 p-3 shadow bg-dark text-white d-flex align-items-center";
    list.appendChild(newCharacterContainer);
    const characterName = document.createElement("h1");
    const characterImage = document.createElement("img");
    const characterOrigin = document.createElement("span");
    const characterStatus = document.createElement("span");
    characterName.textContent = name;
    characterImage.src = image;
    characterName.className = "my-3 p-2";
    characterImage.className = "images";
    characterOrigin.className = "fs-5 mt-2 p-1";
    characterStatus.className = "fs-5 mt-1 p-1";
    characterOrigin.textContent = "Origin: " + origin;
    characterStatus.textContent = "Status of the character: " + status;
    newCharacterContainer.appendChild(characterName);
    newCharacterContainer.appendChild(characterImage);
    newCharacterContainer.appendChild(characterOrigin);
    newCharacterContainer.appendChild(characterStatus);
  };

  const getAllCharacters = (index) => {
    clearList();
    fetch("https://rickandmortyapi.com/api/character/?page=" + index)
      .then((response) => response.json())
      .then((data) => {
        pageLength = data.info.pages;
        for (let i = 0; i < data.results.length; i++) {
          createCharacter(
            data.results[i].id,
            data.results[i].name,
            data.results[i].image,
            data.results[i].origin.name,
            data.results[i].status
          );
        }
      });
  };

  const searchCharacter = () => {
    console.log(searchbar.value.length);
    if (searchbar.value.length >= 3) {
      clearList();
      fetch(
        "https://rickandmortyapi.com/api/character/?name=" + searchbar.value
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.results.length; i++) {
            createCharacter(
              data.results[i].id,
              data.results[i].name,
              data.results[i].image,
              data.results[i].origin.name,
              data.results[i].status
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
