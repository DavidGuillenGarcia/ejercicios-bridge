window.onload = () => {
  const flagsContainers = document.getElementById("flagsContainers");
  const searchbar = document.getElementById("searchBar");
  const searchBtn = document.getElementById("searchBtn");

  const searchAFlag = () => {
    console.log(searchbar.value);
    clearFlags();
    fetch("https://restcountries.com/v3.1/name/" + searchbar.value)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          createAFlag(data[i].flags.png);
        }
      });
  };

  const createAFlag = (image) => {
    const flag = document.createElement("img");
    flag.src = image;
    flag.className = "images m-3 rounded rounded-3";
    flagsContainers.appendChild(flag);
  };

  const clearFlags = () => {
    flagsContainers.innerHTML = "";
  };

  searchBtn.addEventListener("click", searchAFlag);

  // Ejercicio 2
  //   const filtrar_por_Nombre = (array, nombre) => {
  //     var filteredArray = array.filter((x) => x.includes(nombre));
  //     return array;
  //   };

  //Devuelve el array que se pasa por la función y no el array filtrado, dejo la corrección a continuación

  const filtrar_por_Nombre = (array, nombre) => {
    var filteredArray = array.filter((x) => x.includes(nombre));
    return filteredArray;
  };
};
