window.onload = () => {
  const list = document.getElementById("pokemonList");
  const input = document.getElementById("searchbar");

  const pokemons = [
    {
      name: "Pikachu",
      type: "electric",
    },
    {
      name: "Bulbasur",
      type: "grass",
    },
    {
      name: "Eevee",
      type: "normal",
    },
    {
      name: "Mew",
      type: "psy",
    },
    {
      name: "Squirtle",
      type: "water",
    },
    {
      name: "Charmander",
      type: "fire",
    },
    {
      name: "Charizard",
      type: "fire",
    },
  ];

  const createPokemon = (id) => {
    const newPokemonContainer = document.createElement("div");
    newPokemonContainer.className = "pokemonContainer";
    list.appendChild(newPokemonContainer);
    const pokemonName = document.createElement("span");
    const pokemonType = document.createElement("span");
    const jump = document.createElement("br");
    pokemonName.textContent = "Pokemon: " + pokemons[id].name;
    pokemonType.textContent = "Type: " + pokemons[id].type;
    newPokemonContainer.appendChild(pokemonName);
    newPokemonContainer.appendChild(jump);
    newPokemonContainer.appendChild(pokemonType);
  };

  const searchPokemon = (id, input) => {
    if (pokemons[id].name.toLowerCase().includes(input.toLowerCase())) {
      createPokemon(id);
    }
  };

  const removeChilds = () => {
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  };

  const listPokemon = () => {
    removeChilds();
    const inputText = input.value;
    for (let i = 0; i < pokemons.length; i++) {
      if (!inputText) {
        createPokemon(i);
      } else {
        searchPokemon(i, inputText);
      }
    }
  };

  input.addEventListener("input", listPokemon);

  listPokemon();
};
