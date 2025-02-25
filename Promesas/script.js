const promise1 = new Promise((resolve, reject) => {
  let randInt = Math.floor(Math.random() * 10);
  setTimeout(() => {
    resolve(randInt);
    console.log("Primer número: " + randInt);
  }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
  let randInt = Math.floor(Math.random() * 10);
  setTimeout(() => {
    resolve(randInt);
    console.log("Segundo número: " + randInt);
  }, 2000);
});
const promise3 = new Promise((resolve, reject) => {
  let randInt = Math.floor(Math.random() * 10);
  setTimeout(() => {
    resolve(randInt);
    console.log("Tercer número: " + randInt);
  }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  const suma = values.reduce((number1, number2) => number1 + number2);
  console.log("Suma total de las promesas: " + suma);
});
