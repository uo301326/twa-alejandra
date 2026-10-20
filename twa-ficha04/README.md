# Ficha 04 — El catálogo con Vue

Práctica de Tecnologías Web Avanzadas · ISLA Gaia · Curso 2026/2027

## Descripción

En esta práctica hemos adaptado el catálogo de la Ficha 03 para utilizar Vue 3. Los datos se cargan desde `items.json` y podemos buscar, filtrar por categoría, ordenar por precio y ver los detalles de cada elemento.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
node check.js
```

## Archivos principales

- `src/App.vue`: contiene el estado, la función para cargar los datos y la página.
- `src/catalog.js`: contiene las funciones del catálogo.
- `public/items.json`: contiene los elementos.
- `src/main.js`: inicia la aplicación Vue.

## Reflexión

**1. ¿Qué ha desaparecido de `main.js` de la Ficha 03 y dónde está ahora?**

El estado está en `App.vue` con `ref`, la parte de dibujar la página se hace con el template de Vue y los eventos se gestionan con directivas como `@click` y `v-model`.

**2. ¿Por qué se escribe `items.value` en el script y `items` en el template?**

En el script usamos `.value` para acceder al contenido de un `ref`. En el template, Vue lo hace automáticamente.

**3. ¿Por qué `visible` es un `computed` y no un `ref` que actualizamos en cada evento?**

Porque se calcula automáticamente cuando cambian los datos de búsqueda, la categoría o el orden. Si lo actualizáramos manualmente en cada evento, podríamos olvidarnos de actualizarlo y mostrar resultados incorrectos.

**4. ¿Para qué sirve `:key`? ¿Qué pasa si usamos el índice de la lista cuando cambia el orden?**

`:key` permite a Vue identificar cada elemento. Si usamos el índice y la lista cambia de orden, Vue puede asociar elementos con datos equivocados y actualizar la interfaz incorrectamente.

## Uso de inteligencia artificial

He utilizado ChatGPT como ayuda para entender algunas partes de Vue y resolver errores durante el desarrollo.

