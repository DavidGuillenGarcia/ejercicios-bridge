# Examen fetch ONCE - The Bridge

Bienvenido/a al primer examen del segundo curso, en este caso se trata de JavaScript avanzado y vamos a estar evaluando el uso de fetch.

**Importante:** Ya lo hablamos en clase, pero no está permitido el uso inteligencia artificial como ChatGPT, Copilot, Gemini, DeepSeek, etc...

Para entregar tu solución, debes subirla a un repositorio en GitHub y agregar como colaboradores a nvent97-thebridge y Rotosama para que puedan acceder a tu código.

# Ejercicio 1

En este ejercicio, debes crear una página web donde los usuarios puedan buscar países y ver sus banderas.
Es necesario un input para que el usuario escriba un texto y un boton para hacer la busqueda.
Cuando el usuario escriba el nombre de un país y presione el botón, se debe hacer una petición a la API: [https://restcountries.com/#rest-countries](https://restcountries.com/#rest-countries)

**Pista:** El endpoint para buscar paises por nombre es el siguiente: `https://restcountries.com/v3.1/name/{nombreABuscar}`

### Resultado final:
![image](https://github.com/user-attachments/assets/c8da6377-c7b3-4ebb-bae9-0bb4564e9418)
![image](https://github.com/user-attachments/assets/d73f8b18-9661-470f-8b98-f0942433bf70)

**Nota:** No es necesario que la página tenga un diseño bonito, lo importante es que se vea la bandera correctamente.

# Ejercicio 2

A continuación, tienes una función en JavaScript que contiene errores. Tu tarea es identificar y explicar los errores:
Escribe un comentario en el archivo del ejercicio 1 explicando qué errores encontraste y cómo corregirlos.

```js

const filtrar_por_Nombre = (array, nombre) => {
  var filteredArray = array.filter((x) => x.includes(nombre))
  return array
}

```

Buena suerte con el examen! 🙂
