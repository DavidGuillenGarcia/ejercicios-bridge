window.onload = () => {
  const list = document.getElementById("pokemonList");
  const input = document.getElementById("searchbar");
  const inputText = input.textContent;

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

  const listPokemon = () => {
    removeChilds();
    for (let i = 0; i < pokemons.length; i++) {
      if (!inputText) {
        const newPokemonContainer = document.createElement("div");
        newPokemonContainer.className = "pokemonContainer";
        list.appendChild(newPokemonContainer);
        const pokemonName = document.createElement("span");
        const pokemonType = document.createElement("span");
        const jump = document.createElement("br");
        pokemonName.textContent = "Pokemon: " + pokemons[i].name;
        pokemonType.textContent = "Type: " + pokemons[i].type;
        newPokemonContainer.appendChild(pokemonName);
        newPokemonContainer.appendChild(jump);
        newPokemonContainer.appendChild(pokemonType);
      } else if (pokemons[i].name.includes(inputText.toLowerCase())) {
        const newPokemonContainer = document.createElement("div");
        newPokemonContainer.className = "pokemonContainer";
        list.appendChild(newPokemonContainer);
        const pokemonName = document.createElement("span");
        const pokemonType = document.createElement("span");
        const jump = document.createElement("br");
        pokemonName.textContent = "Pokemon: " + pokemons[i].name;
        pokemonType.textContent = "Type: " + pokemons[i].type;
        newPokemonContainer.appendChild(pokemonName);
        newPokemonContainer.appendChild(jump);
        newPokemonContainer.appendChild(pokemonType);
      }
    }
  };

  input.addEventListener("input", listPokemon);
  const filterPokemon = (input, name) => {
    name.includes(input.toLowerCase());
  };

  function removeChilds() {
    if (document.querySelector(".pokemonContainer")) {
      list.innerHTML = "";
    }
  }

  listPokemon();
};
