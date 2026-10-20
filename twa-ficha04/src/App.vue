

<script setup>
import { ref, computed } from 'vue'
import { byCategory, categories, search, sortByPrice } from './catalog.js'

// Estado de la aplicación
const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// Cargar los datos
async function load(url = '/items.json') {
  status.value = 'loading'
  error.value = null

  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} — ${url}`)
    }

    items.value = await res.json()
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

// Elementos que se muestran
const visible = computed(() => {
  let result = search(items.value, query.value)

  if (category.value !== '') {
    result = byCategory(result, category.value)
  }

  return sortByPrice(result, sortDir.value)
})

// Categorías disponibles
const cats = computed(() => {
  return categories(items.value)
})

// Elemento seleccionado
const selected = computed(() => {
  return items.value.find((i) => i.id === selectedId.value)
})

load()

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

      <ul>
        <li
          v-for="item in visible"
          :key="item.id"
          :class="{ selected: item.id === selectedId }"
          @click="selectedId = item.id"
        >
          {{ item.name }} · {{ item.price.toFixed(2) }} €
        </li>
      </ul>

      <section v-if="selected">
        <h2>{{ selected.name }}</h2>

        <dl>
          <dt>Category</dt>
          <dd>{{ selected.category }}</dd>

          <dt>Price</dt>
          <dd>{{ selected.price.toFixed(2) }} €</dd>

          <dt>Tags</dt>
          <dd>{{ selected.tags.join(', ') }}</dd>

          <template v-for="(value, key) in selected" :key="key">
            <template v-if="value && typeof value === 'object' && !Array.isArray(value)">
              <template v-for="(nestedValue, nestedKey) in value" :key="nestedKey">
                <dt>{{ key }}.{{ nestedKey }}</dt>
                <dd>{{ nestedValue }}</dd>
              </template>
            </template>
          </template>
        </dl>
      </section>
    </section>
  </main>
</template>

