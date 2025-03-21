const ctx = document.getElementById("miGrafico").getContext("2d");

const datos = {
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  datasets: [
    {
      label: "Ventas por mes",
      data: [65, 59, 80, 81, 56, 55, 40, 28, 59, 23, 47, 71],
      backgroundColor: [
        "aquamarine",
        "red",
        "green",
        "blue",
        "brown",
        "grey",
        "lightgrey",
        "lightgreen",
        "yellow",
        "purple",
        "magenta",
        "orange",
      ],
      borderColor: "black",
      borderWidth: 0.3,
    },
  ],
};

const miGrafico = new Chart(ctx, {
  type: "bar", // Tipo de gráfico: 'bar', 'line', 'pie', etc.
  data: datos,
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
