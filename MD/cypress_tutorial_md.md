# Creando Tests Unitarios con Cypress: Guía Paso a Paso

Vamos a crear tests unitarios sencillos usando Cypress. Te mostraré cómo configurar el entorno y escribir tests para funciones básicas.

## Instalación y Configuración

1. Crea una carpeta para tu proyecto y abre una terminal en esa ubicación

2. Inicializa un proyecto de Node.js:
   ```bash
   AQUI NADA!
   ```

3. Instala Cypress como dependencia de desarrollo:
   ```bash
   npm install cypress --save-dev
   ```

4. Abre Cypress por primera vez:
   ```bash
   npx cypress open
   ```

5. En la ventana que se abre, selecciona "E2E Testing" (aunque haremos tests unitarios, necesitamos configurar Cypress primero)

6. Haz clic en "Continue" para que Cypress cree los archivos de configuración necesarios

7. Selecciona Chrome como navegador y haz clic en "Start E2E Testing in Chrome"

HEMOS LLEGADO HASTA AQUI!! MAÑANA SEGUIMOS DESDE AQUI!!!

## Creando Nuestras Funciones a Testear

Crea un archivo llamado `math.js` en la raíz de tu proyecto con las siguientes funciones:

```javascript
// math.js
function suma(a, b) {
  return a + b;
}

function multiplica(a, b) {
  return a * b;
}

module.exports = { suma, multiplica };
```

## Creando los Tests Unitarios

1. Crea una carpeta `cypress/e2e` si no existe ya

2. Dentro de esta carpeta, crea un archivo llamado `math.cy.js` con el siguiente contenido:

```javascript
// cypress/e2e/math.cy.js
const { suma, multiplica } = require('../../math');

describe('Funciones matemáticas', () => {
  context('Función suma', () => {
    it('suma correctamente dos números positivos', () => {
      expect(suma(2, 3)).to.eq(5);
    });

    it('suma correctamente un número positivo y uno negativo', () => {
      expect(suma(5, -2)).to.eq(3);
    });
  });

  context('Función multiplica', () => {
    it('multiplica correctamente dos números positivos', () => {
      expect(multiplica(2, 3)).to.eq(6);
    });

    it('multiplica correctamente por cero', () => {
      expect(multiplica(5, 0)).to.eq(0);
    });
  });
});
```
¿Qué es eso del "eq"?
- https://docs.cypress.io/api/commands/eq
- https://www.geeksforgeeks.org/cypress-eq-method/

## Ejecutando los Tests

Hay dos formas de ejecutar los tests:

### Modo Interactivo (UI)

1. Ejecuta `npx cypress open`
2. Selecciona "E2E Testing"
3. Elige tu navegador y haz clic en "Start E2E Testing"
4. En el explorador de Cypress, haz clic en el archivo `math.cy.js`
5. Verás los tests ejecutándose en el navegador con resultados visuales

### Modo Headless (Terminal)

Para ejecutar los tests directamente desde la terminal sin interfaz gráfica:

```bash
npx cypress run --spec "cypress/e2e/math.cy.js"
```

## Explicación del Código de Test

Los tests siguen el patrón AAA (Arrange-Act-Assert):

1. **Arrange**: Importamos las funciones que queremos testear
2. **Act**: Llamamos a las funciones con parámetros específicos
3. **Assert**: Verificamos que el resultado sea el esperado usando `expect().to.eq()`

Usamos `describe()` para agrupar nuestros tests, `context()` para subgrupos y `it()` para tests individuales. Estas funciones vienen de Mocha, que es el framework de testing que Cypress utiliza internamente.

Con estos pasos básicos, ya tienes un ejemplo funcional de tests unitarios con Cypress. Puedes expandir este ejemplo añadiendo más funciones y tests según tus necesidades.

POR SI QUIERES SABER MAS:

- https://learn.cypress.io/testing-your-first-application/installing-cypress-and-writing-your-first-test
- https://qa-essentials.com/cypress-installation-ultimate-guide-your-first-tests-with-javascript/
