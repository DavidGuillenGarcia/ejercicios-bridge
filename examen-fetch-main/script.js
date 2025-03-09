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
    flagsContainers.appendChild(flag);
  };

  const clearFlags = () => {
    flagsContainers.innerHTML = "";
  };

  searchBtn.addEventListener("click", searchAFlag);
};
