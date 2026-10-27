
# Ficha 05 — Componentes, formularios y composables con Vue

Práctica de Tecnologías Web Avanzadas · ISLA Gaia · Curso 2026/2027

## Descripción

En esta práctica hemos continuado el catálogo de la Ficha 04 utilizando Vue 3. Hemos separado la aplicación en componentes, creado un formulario para añadir nuevos elementos, utilizado un composable para gestionar la carga de datos y añadido watch para reaccionar a los cambios en el buscador.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
node check.js
```

## Archivos principales

- `src/App.vue`: contiene el estado principal de la aplicación y conecta los componentes.
- `src/catalog.js`: contiene las funciones del catálogo.
- `src/components/ItemList.vue`: muestra la lista de elementos y comunica cuál se ha seleccionado.
- `src/components/ItemDetail.vue`: muestra los detalles del elemento seleccionado.
- `src/components/ItemForm.vue`: contiene el formulario para añadir nuevos elementos.
- `src/composables/useLoad.js`: gestiona la carga de datos y sus estados.
- `src/api/getJSON.js`: obtiene los datos mediante fetch.
- `public/items.json`: contiene los elementos del catálogo.

## Preguntas

**1. ¿Por qué ItemList no modifica directamente selectedId? ¿Qué aporta emit?**

Porque selectedId pertenece al componente padre. Con emit, ItemList comunica qué elemento se ha seleccionado y App.vue actualiza el estado. Así cada componente tiene su propia responsabilidad.

**2. ¿Por qué visible es computed y limpiar la selección es watch?**

computed se utiliza para calcular un valor a partir de otros datos y se actualiza automáticamente cuando cambian; watch se utiliza cuando queremos ejecutar una acción al cambiar un dato, como quitar la selección al escribir en el buscador.

**3. ¿Qué ventajas aporta useLoad? ¿Qué pasaría si onMounted estuviera fuera?**

useLoad permite reutilizar la carga de datos y gestionar sus tres estados (loading, success y error) sin repetir el código. Si onMounted estuviera fuera, habría que repetir la lógica de carga en cada componente que necesitase los datos.

**4. ¿Por qué el formulario valida en HTML, con computed y en la API? ¿Cuál protege los datos?**

HTML realiza una primera validación, computed comprueba los datos mientras rellenamos el formulario y la API vuelve a validarlos al recibirlos. La validación de la API es la que realmente protege los datos, porque no se puede confiar únicamente en las validaciones del navegador.

## Uso de inteligencia artificial

He utilizado ChatGPT como ayuda para entender Vue 3, organizar los componentes y resolver errores durante el desarrollo en casa.
