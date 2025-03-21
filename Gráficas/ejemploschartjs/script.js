const ctx = document.getElementById('miGrafico').getContext('2d');

const datos = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [{
      label: 'Ventas',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const miGrafico = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico: 'bar', 'line', 'pie', etc.
    data: datos,
    options: {
      scales: {
        // y: {
        //   beginAtZero: true
        // }
      }
    }
  });