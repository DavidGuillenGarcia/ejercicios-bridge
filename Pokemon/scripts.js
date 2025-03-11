window.onload = () => {
  const tittle = document.getElementById("gen-1");
  tittle.innerText = "Generasión 1 Pokimon";

  const generation1 = document.querySelectorAll(".infocard-list .infocard");
  const images = document.querySelectorAll("img");
  const pokemonFlyingType = document.querySelectorAll(
    ".infocard-lg-data small .flying"
  );

  const pokemon = {
    name: "Nidoqueen",
    id: "31",
    type: "Poison",
    secondary_type: "Ground",
    hability1: "Poison point",
    hability2: "Rivalry",
    hidden_hability: "Sheer Force",
  };

  const favoritePokemon = localStorage.setItem(
    "favorite",
    JSON.stringify(pokemon)
  );

  const changeColor = () => {
    generation1.forEach((pokemonGen1) => {
      pokemonGen1.style.backgroundColor = "aquamarine";
    });
  };

  const changeImage = () => {
    images.forEach((image) => {
      image.src = "https://media.giphy.com/media/2v170e71aanfi/giphy.gif";
    });
  };

  const changepokemonFlyingTypeBackground = () => {
    pokemonFlyingType.forEach((FlyingType) => {
      FlyingType.parentNode.parentNode.parentNode.style.backgroundColor =
        "lightgrey";
    });
  };

  changeColor();
  changeImage();
  changepokemonFlyingTypeBackground();

  console.log(window.location.href);
  console.log(window.location.hostname);
  console.log(localStorage.getItem("favorite"));
};
