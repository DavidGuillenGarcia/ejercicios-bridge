window.onload = () => {
  const list = document.getElementById("pokemonList");
  const inputBar = document.getElementById("searchbar");

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
    pokemonName.textContent = "Pokemon: " + pokemons[id].name;
    pokemonType.textContent = "Type: " + pokemons[id].type;
    newPokemonContainer.appendChild(pokemonName);
    newPokemonContainer.appendChild(pokemonType);
  };

  const searchPokemon = (id, input) => {
    if (!inputBar.value) {
      createPokemon(id);
    } else if (pokemons[id].name.toLowerCase().includes(input.toLowerCase())) {
      createPokemon(id);
    }
  };

  const cleanList = () => {
    list.innerHTML = "";
  };

  const listPokemon = () => {
    cleanList();

    for (let i = 0; i < pokemons.length; i++) {
      searchPokemon(i, inputBar.value);
    }
  };

  inputBar.addEventListener("input", listPokemon);

  listPokemon();
};
