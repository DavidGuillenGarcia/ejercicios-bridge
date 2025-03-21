const btnGetJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");
const graph = document.getElementById("graph");
const ctx = graph.getContext("2d");
let chart = null;

let jokesArray = [];

const getDataForGraph = () => {
  let jokesStoraged = JSON.parse(localStorage.getItem("jokes"));
  let jokesLength = [];
  let jokesId = [];
  jokesStoraged.forEach((joke) => {
    jokesId.push(joke.id);
    jokesLength.push(joke.text.length);
  });
  const datos = {
    labels: jokesId,
    datasets: [
      {
        label: "Length per joke",
        data: jokesLength,
        backgroundColor: "aquamarine",
        borderColor: "black",
        borderWidth: 0.3,
      },
    ],
  };
  return datos;
};

const getJoke = () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((data) => {
      jokesArray.push({ id: data.id, text: data.value });
      saveJokes();
      displayJokes();
      createNewGraph();
    });
};

const displayJokes = () => {
  jokeList.innerHTML = "";
  jokesArray.forEach((joke, index) => {
    jokeList.innerHTML += `
        <div>
        <p>${joke.text}</p>
        <button class='redButton' onclick=deleteJoke(${index})>Eliminar</button>
        </div>
        `;
  });
};

const createNewGraph = () => {
  if (chart) {
    chart.destroy();
  }
  if (localStorage.getItem("jokes").length > 2) {
    chart = new Chart(ctx, {
      type: "bar",
      data: getDataForGraph(),
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              boxHeight: 0,
              font: {
                size: 45,
              },
              color: "#1e1e1e",
            },
          },
        },
        scales: {
          // y: {
          //   beginAtZero: true
          // }
        },
      },
    });
  }
};

const saveJokes = () => {
  localStorage.setItem("jokes", JSON.stringify(jokesArray));
};

const deleteJoke = (idToDelete) => {
  // Filtrar aquellos elementos cuyo indice sea diferente al seleccionado a borrar
  jokesArray = jokesArray.filter((_, index) => index != idToDelete);
  saveJokes();
  displayJokes();
  createNewGraph();
};

const loadJokes = () => {
  if (localStorage.getItem("jokes")) {
    const localJokes = JSON.parse(localStorage.getItem("jokes"));
    jokesArray = localJokes;
    displayJokes();
  }
};

btnGetJoke.addEventListener("click", getJoke);

createNewGraph();

loadJokes();
