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

const pokemon = {
  name: "Bulbasaur",
  type: "grass",
  ability: {
    primary: "Overgrow",
    hidden: "Chlorophyll",
  },
  stats: {
    hp: 45,
    attack: 49,
    deffense: 59,
    speed: 45,
  },
  moves: ["Growl", "Tackle", "Vine Whip", "Razor Leaf"],
};

const pikachu = {
  name: "Pikachu",
  type: "electric",
  ability: {
    primary: "Static",
    hidden: "Lightning rod",
  },
  stats: {
    hp: 35,
    attack: 55,
    deffense: 40,
    speed: 90,
  },
  moves: ["Quick Attack", "Volt Tackle", "Iron Tail", "Thunderbolt"],
};

var listaPokemon = {};
const num1 = [1, 2, 3, 4];
const num2 = [1, 2, 3, 4];
const num3 = [1, 2, 3, 4];
const num4 = [1, 2, 3, 4];

listaPokemon = { ...pokemon, ...pikachu };
console.log(listaPokemon);

function combineTwoArrays(array1, array2) {
  return [...array1, ...array2];
}

console.log(combineTwoArrays(num1, num2));

function combineAllArrays(...arrays) {
  let newArray = [];
  for (let i = 0; i < arrays.length; i++) {
    newArray = [...newArray, ...arrays[i]];
  }
  return newArray;
}

console.log(combineAllArrays(num1, num2));
