# Ficha 06 — Vue Router, estado global y paginación

Práctica de Tecnologías Web Avanzadas · ISLA Gaia · Curso 2026/2027

## Descripción

En esta práctica hemos continuado el catálogo de la Ficha 05 utilizando Vue 3 y Vue Router. Hemos añadido navegación mediante rutas, una página de detalle y un formulario para añadir nuevos elementos.

También hemos creado una lista paginada de Pokémon utilizando la PokéAPI, guardando la página actual en la URL y utilizando watch para detectar los cambios.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

## Archivos principales

- `src/App.vue`: contiene el menú de navegación y RouterView.
- `src/router.js`: configura las rutas de la aplicación.
- `src/store.js`: contiene el estado global y las funciones para gestionar los elementos.
- `src/pages/CatalogPage.vue`: muestra el catálogo y permite buscar, filtrar y ordenar.
- `src/pages/ItemPage.vue`: muestra los detalles de un elemento.
- `src/pages/NewItemPage.vue`: contiene el formulario para añadir elementos.
- `src/pages/NotFound.vue`: muestra un error cuando la ruta no existe.
- `src/pages/PokemonPage.vue`: muestra los Pokémon y permite navegar entre páginas.
- `src/api/pokeapi.js`: contiene las funciones para consultar la PokéAPI.
- `src/composables/useLoad.js`: gestiona la carga de datos y sus estados.
- `src/api/getJSON.js`: obtiene los datos mediante fetch.

## Preguntas

**1. The results page lives in the URL (?page=3), not in a ref. What would stop working with a ref?**

Con un ref, la página actual no estaría guardada en la URL. Al recargar se perdería y tampoco funcionarían correctamente los botones Atrás y Adelante del navegador.

**2. You created an item at /items/new, went back to the list and it was there; you reloaded and it was gone. Explain both — and what changes in M2.**

El elemento se guarda en el estado global, por eso sigue apareciendo al cambiar de ruta. Al recargar se pierde porque solo está en memoria. En M2 se guardará en MongoDB mediante una API Express y será permanente.

**3. /items/1 → /items/2 reuses ItemPage; / → /items/1 mounts it anew. When does onMounted fire, and when do you need a watch?**

onMounted se ejecuta cuando se monta un componente por primera vez. Si cambia el identificador sin cambiar de componente, necesitamos watch para detectar el cambio y actualizar los datos.

**4. SPA, SSR or SSG: which would you pick for your project and why?**

Elegiría SPA porque permite navegar entre páginas sin recargar toda la aplicación y actualizar los datos dinámicamente, algo adecuado para nuestro catálogo.

## Uso de inteligencia artificial

He utilizado ChatGPT como ayuda para entender Vue Router, organizar las rutas y resolver errores durante el desarrollo en casa.