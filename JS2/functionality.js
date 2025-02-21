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

  const listPokemon = () => {
    const inputText = input.value;
    removeChilds();
    for (let i = 0; i < pokemons.length; i++) {
      console.log(inputText);
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
      } else {
        if(pokemons[i].name.toLowerCase().includes(inputText) == true){
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
        else{
          console.log("No bro");
        }
      }
    }
  };

  input.addEventListener("input", listPokemon);

  function removeChilds() {
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
  }

  listPokemon();
};
