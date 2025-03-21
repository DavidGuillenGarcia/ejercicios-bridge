# CHART.JS 

Chart.js es una biblioteca de JavaScript que permite crear gráficos interactivos y atractivos utilizando el elemento `<canvas>` de HTML5. Es altamente personalizable y soporta diversos tipos de gráficos, como líneas, barras, radar, áreas polares, pastel, dona y burbujas. A continuación, se presenta un curso detallado que abarca desde los conceptos básicos hasta funcionalidades avanzadas de Chart.js.

## 1. Instalación y Configuración Inicial

Para comenzar a utilizar Chart.js, primero debes incluir la biblioteca en tu proyecto. Puedes hacerlo de las siguientes maneras:

- **CDN**: Incluye la biblioteca directamente desde un Content Delivery Network en tu archivo HTML:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  ```

Para comprender a fondo cómo configurar y personalizar gráficos con Chart.js, es esencial conocer las principales secciones que componen su objeto de configuración. Estas secciones permiten definir el tipo de gráfico, los datos a representar y las opciones de personalización. A continuación, se detallan las secciones más importantes:

## 1. `type`

Esta propiedad especifica el tipo de gráfico que se desea crear. Chart.js soporta diversos tipos de gráficos, entre los que se incluyen:

- **`bar`**: Gráfico de barras.
- **`line`**: Gráfico de líneas.
- **`pie`**: Gráfico de pastel.
- **`doughnut`**: Gráfico de dona.
- **`radar`**: Gráfico de radar.
- **`polarArea`**: Gráfico de área polar.
- **`bubble`**: Gráfico de burbujas.
- **`scatter`**: Gráfico de dispersión.

Por ejemplo, para crear un gráfico de barras:

```javascript
const config = {
  type: 'bar',
  // otras propiedades
};
```


## 2. `data`

La propiedad `data` es fundamental, ya que define los datos que se representarán en el gráfico. Esta propiedad generalmente contiene dos subpropiedades principales: `labels` y `datasets`.

### a. `labels`

`labels` es un array que contiene las etiquetas para cada punto de datos en el eje principal (generalmente el eje X). Estas etiquetas suelen ser cadenas de texto que describen cada categoría o punto de datos.

```javascript
const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  // datasets
};
```


### b. `datasets`

`datasets` es un array de objetos, donde cada objeto representa un conjunto de datos que se trazará en el gráfico. Cada dataset puede contener las siguientes propiedades:

- **`label`**: Nombre del conjunto de datos que aparecerá en la leyenda y en las tooltips.
- **`data`**: Array de valores numéricos que corresponden a cada etiqueta en `labels`.
- **`backgroundColor`**: Color de fondo de las barras, puntos o segmentos. Puede ser un solo color o un array de colores para cada dato.
- **`borderColor`**: Color del borde de las barras, puntos o segmentos. Similar a `backgroundColor`, puede ser un solo color o un array.
- **`borderWidth`**: Ancho del borde en píxeles.

Ejemplo de un dataset:

```javascript
const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
  datasets: [{
    label: 'Ventas',
    data: [65, 59, 80, 81],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};
```


Es importante destacar que Chart.js permite múltiples datasets en un solo gráfico, lo que facilita la comparación entre diferentes conjuntos de datos.

## 3. `options`

La sección `options` permite personalizar la apariencia y el comportamiento del gráfico. Algunas de las opciones más utilizadas incluyen:

### a. `scales`

Define la configuración de las escalas del gráfico. Por ejemplo, en un gráfico de barras o líneas, puedes configurar los ejes X e Y:

```javascript
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
```


En este ejemplo, la escala del eje Y comienza en cero, lo que es útil para representar datos que no deben tener valores negativos.

### b. `plugins`

Permite configurar opciones específicas para los plugins integrados o personalizados. Por ejemplo, para personalizar la leyenda:

```javascript
const options = {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    }
  }
};
```


Aquí, la leyenda se muestra en la parte superior del gráfico.

### c. `responsive` y `maintainAspectRatio`

Estas opciones controlan la capacidad de respuesta del gráfico y la relación de aspecto:

```javascript
const options = {
  responsive: true,
  maintainAspectRatio: false
};
```


Al establecer `maintainAspectRatio` en `false`, el gráfico puede ajustarse al contenedor sin mantener una relación de aspecto fija.

### d. `animation`

Permite configurar las animaciones del gráfico:

```javascript
const options = {
  animation: {
    duration: 1000, // Duración en milisegundos
    easing: 'easeOutBounce' // Tipo de animación
  }
};
```


Este ejemplo establece una animación de salida con rebote que dura 1 segundo.


## 2. Estructura Básica del Código

La estructura básica para crear un gráfico con Chart.js incluye los siguientes pasos:

1. **Elemento `<canvas>`**: Añade un elemento `<canvas>` en tu HTML donde se renderizará el gráfico.

   ```html
   <canvas id="miGrafico" width="400" height="200"></canvas>
   ```


2. **Contexto del lienzo**: Obtén el contexto 2D del lienzo en tu script JavaScript.

   ```javascript
   const ctx = document.getElementById('miGrafico').getContext('2d');
   ```


3. **Datos y configuración**: Define los datos y las opciones de configuración del gráfico.

   ```javascript
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
   ```


4. **Creación del gráfico**: Inicializa el gráfico pasando el contexto, los datos y las opciones de configuración.

   ```javascript
   const miGrafico = new Chart(ctx, {
     type: 'bar', // Tipo de gráfico: 'bar', 'line', 'pie', etc.
     data: datos,
     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   });
   ```


## 3. Tipos de Gráficos Soportados

Chart.js soporta una variedad de tipos de gráficos. A continuación, se presentan algunos de los más comunes junto con ejemplos de código para cada uno:

### a. Gráfico de Líneas

Ideal para mostrar tendencias a lo largo del tiempo.

```javascript
const miGraficoLineas = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Ingresos',
      data: [30, 50, 40, 60, 70],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```


### b. Gráfico de Barras

Útil para comparar cantidades entre diferentes categorías.

```javascript
const miGraficoBarras = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Producto A', 'Producto B', 'Producto C'],
    datasets: [{
      label: 'Ventas',
      data: [200, 150, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```


### c. Gráfico de Pastel

Muestra proporciones de un todo.

```javascript
const miGraficoPastel = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Rojo', 'Azul', 'Amarillo'],
    datasets: [{
      label: 'Colores Favoritos',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  }
});
```


### d. Gráfico de Donut

Similar al gráfico de pastel, pero con un centro vacío.

```javascript
const miGraficoDonut = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Rojo', 'Azul', 'Amarillo'],
        datasets: [{
            label: 'Colores Favoritos',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                    }]
                    }
                    });

```

### e. Gráfico de Radar


Muestra datos en un formato circular, útil para comparar múltiples variables.
```javascript

const miGraficoRadar = new Chart(ctx, { 
    type: 'radar', 
    data: { 
        labels: ['Eficiencia', 'Productividad', 'Calidad', 'Innovación', 'Satisfacción'], 
        datasets: [{ 
            label: 'Desempeño', 
            data: [65, 59, 90, 81, 56], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1 
            }] 
            } 
            }); 

```
