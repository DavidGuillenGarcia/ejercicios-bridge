window.onload = () => {
  const list = document.getElementById("characterList");
  const baseURL = "https://rickandmortyapi.com/api/character/";
  let index = 1;

  const createCharacter = (id, name, image, origin, status) => {
    const newCharacterContainer = `<div id="${id}" 
        class="characterContainer card card-body m-2 p-3 shadow bg-dark text-white d-flex align-items-center">
        <h1 class="my-3 p-2">${name}</h1>
        <img src="${image}" class="images rounded rounded-3" />
        <span class="fs-5 mt-2 p-1">${origin}</span>
        <span class="fs-5 mt-2 p-1">${status}</span>
      </div>`;
    list.innerHTML += newCharacterContainer;
  };

  const getAllCharacters = (index) => {
    clearList();
    fetch(baseURL + "?page=" + index)
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
  };

  const clearList = () => {
    list.innerHTML = "";
  };

  getAllCharacters(index);
};
