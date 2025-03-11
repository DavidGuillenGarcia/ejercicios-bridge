window.onload = () => {
  const tittle = document.getElementById("gen-1");
  const generation1 = document.querySelector(".infocard-list");
  const pokemon1 = generation1.querySelectorAll(".infocard");
  const images = document.querySelectorAll("img");
  const flyingType = document.querySelectorAll(
    ".infocard-lg-data small .flying"
  );

  const changeColor = () => {
    for (let i = 0; i < pokemon1.length; i++) {
      pokemon1[i].style.backgroundColor = "aquamarine";
    }
  };

  const changeFlyingTypeBackground = () => {
    for (let i = 0; i < flyingType.length; i++) {
      flyingType[i].parentNode.parentNode.style.backgroundColor = "grey";
    }
  };

  const changeImage = () => {
    for (let i = 0; i < images.length; i++) {
      images[i].src = "https://media.giphy.com/media/2v170e71aanfi/giphy.gif";
    }
  };

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

  console.log(localStorage.getItem("favorite"));

  changeColor();
  changeImage();
  changeFlyingTypeBackground();
  tittle.innerText = "Generasión 1 Pokimon";
  console.log(window.location.href);
  console.log(document.location.hostname);
};
