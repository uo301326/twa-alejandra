
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// Obtener la página desde la URL
const page = computed(() => Number(route.query.page ?? 1))

// Cargar los Pokémon
const { status, error, data, load } = useLoad(() => list(page.value))

// Volver a cargar cuando cambia la página
watch(page, load)

// Calcular el número total de páginas
const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

// Cambiar de página
function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <main>
    <h1>Pokémon</h1>

    <p v-if="status === 'loading'">
      Loading…
    </p>

    <section v-else-if="status === 'error'">
      <p>Error: {{ error }}</p>
      <button @click="load()">Retry</button>
    </section>

    <section v-else-if="status === 'success'">
      <div>
        <button
          :disabled="page <= 1"
          @click="go(page - 1)"
        >
          Previous
        </button>

        Page {{ page }} of {{ pages }}

        <button
          :disabled="page >= pages"
          @click="go(page + 1)"
        >
          Next
        </button>
      </div>

      <ul>
        <li v-for="p in data.results" :key="p.name">
          {{ p.name }}
        </li>
      </ul>
    </section>
  </main>
</template>
