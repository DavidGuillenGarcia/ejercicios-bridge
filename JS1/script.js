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
const programacion = 95;

const calificacionesNuevas = {
  ...estudiante.calificaciones,
  programacion,
};

const { nombre, edad, ciudad } = estudiante1;
console.log(nombre, edad, ciudad, calificacionesNuevas);
