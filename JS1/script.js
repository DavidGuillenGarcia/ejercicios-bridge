const estudiante = {
  nombre: "Ana",
  edad: 20,
  ciudad: "Madrid",
  calificaciones: {
    matematicas: 85,
    historia: 90,
    ingles: 75,
  },
};

const estudiante1 = { ...estudiante };
console.log(estudiante1);

estudiante1.ciudad = "Barcelona";

const calificacionesNuevas = {
  ...estudiante.calificaciones,
  programacion: 95,
};

const { nombre, edad, ciudad } = estudiante1;
console.log(nombre, edad, ciudad, calificacionesNuevas);

function sumEveryOther(...numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function getSum(total, num) {
  return total + num;
}

function sumEveryOther2(...numbers) {
  return numbers.reduce((n1, n2) => n1 + n2);
}

console.log(sumEveryOther2(1, 2, 3, 4, 5));
