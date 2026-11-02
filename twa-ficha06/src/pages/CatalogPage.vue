
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { byCategory, categories, search, sortByPrice } from '../catalog.js'
import ItemList from '../components/ItemList.vue'
import { items, status, error, load, ensureLoaded } from '../store.js'

const router = useRouter()

// Cargar los productos al entrar en la página
onMounted(ensureLoaded)

// Estado de los controles
const query = ref('')
const category = ref('')
const sortDir = ref('desc')

// Cuando cambia la búsqueda
watch(query, () => {
  // Aquí ya no necesitamos seleccionar un producto
})

// Elementos que se muestran
const visible = computed(() => {
  let result = search(items.value ?? [], query.value)

  if (category.value !== '') {
    result = byCategory(result, category.value)
  }

  return sortByPrice(result, sortDir.value)
})

// Categorías disponibles
const cats = computed(() => {
  return categories(items.value ?? [])
})
</script>

<template>
  <main>
    <h1>TWA · ISLA Gaia 2026/27</h1>

    <form @submit.prevent>
      <label for="q">Search:</label>
      <input id="q" v-model="query" type="text">

      <label for="category">Category:</label>
      <select id="category" v-model="category">
        <option value="">All</option>
        <option v-for="cat in cats" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <button type="button" @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'">
        Price {{ sortDir === 'desc' ? '↓' : '↑' }}
      </button>
    </form>

    <p v-if="status === 'loading'">Loading…</p>

    <p v-else-if="status === 'error'">
      Error: {{ error }}
      <button type="button" @click="load()">Retry</button>
    </p>

    <section v-else>
      <p v-if="visible.length > 0">
        {{ visible.length }} {{ visible.length === 1 ? 'item' : 'items' }}
      </p>

      <p v-else>
        No results for "{{ query }}"
      </p>

      <ItemList
        :items="visible"
        @select="router.push({ name: 'item', params: { id: $event } })"
    />
    </section>
  </main>
</template>
