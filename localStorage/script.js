const user = {
  nombre: "David",
  edad: 28,
  profesion: "programador",
  CP: 46023,
  ciudad: "Valencia",
  telefono: 601261448,
};

// localStorage.setItem("nombre", "David");
// localStorage.setItem("edad", 28);
// localStorage.setItem("profesion", "programador");
// localStorage.setItem("CP", 46023);
// localStorage.setItem("ciudad", "Valencia");
// localStorage.setItem("telefono", 601261448);

const newUser = localStorage.setItem("usuario", JSON.stringify(user));
const newUserParsed = JSON.parse(localStorage.getItem("usuario"));

console.log(
  "Mi nombre es " +
    newUserParsed.nombre +
    " tengo " +
    newUserParsed.edad +
    " años soy " +
    newUserParsed.profesion +
    " vivo en " +
    newUserParsed.ciudad +
    " con código postal " +
    newUserParsed.CP +
    " y mi teléfono es " +
    newUserParsed.telefono
);

const nuevaCiudad = "Málaga";
newUserParsed.ciudad = nuevaCiudad;
delete newUserParsed.CP;
delete newUserParsed.telefono;
localStorage.setItem("usuario", JSON.stringify(newUserParsed));

console.log(localStorage.getItem("usuario"));
