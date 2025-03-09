## Ejercicio 2

```js
const filtrar_por_Nombre = (array, nombre) => {
	var filteredArray = array.filter((x) => x.includes(nombre));
	return array;
};
```

1. No devuelve el array filtrado, devuelve el array original.
2. El nombre de la función no está escrito en **camelCase**.
3. Se declara la variable con `var` y deberiamos usar `let` o `const`.
4. El parámetro que recibe filter, podría ser más explícito, como por ejemplo `array.filter((element) => element.includes(nombre));`
5. En la función hay palabras en español y en inglés.

**_ Posible solucion _**

```js
const filterByName = (array, name) => {
	const filteredArray = array.filter((element) => element.includes(name));
	return filteredArray;
};
```
