
<script setup>
import { ref, computed, watch } from 'vue'
import { byCategory, categories, search, sortByPrice } from './catalog.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'
import { useLoad } from './composables/useLoad.js'
import { getJSON } from './api/getJSON.js'

// Estado de la aplicación
const { status, error, data: items, load } = useLoad(() => getJSON('/items.json'))

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

watch(query, () => {
  selectedId.value = null
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

// Elemento seleccionado
const selected = computed(() => {
  return (items.value ?? []).find((i) => i.id === selectedId.value)
})

const nextId = computed(() => Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1)

function addItem(item) {
  items.value.push({
    id: nextId.value,
    ...item
  })
}
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
        :selected-id="selectedId"
        @select="selectedId = $event"
      />

      <ItemDetail
        v-if="selected"
        :item="selected"
      />

      <ItemForm
        :cats="cats"
        @save="addItem"
      />
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
  color: #6b6375;
}

h1, h2 {
  color: #08060d;
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
}

form {
  margin-bottom: 25px;
}

label {
  margin-right: 8px;
}

input, select, button {
  padding: 8px;
  margin: 5px;
  border: 1px solid #e5e4e7;
  border-radius: 5px;
}

button {
  background-color: #aa3bff;
  color: white;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #e5e4e7;
  border-radius: 5px;
  cursor: pointer;
}

li:hover {
  background-color: rgba(170, 59, 255, 0.1);
}

.selected {
  background-color: rgba(170, 59, 255, 0.2);
  border: 2px solid #aa3bff;
  font-weight: bold;
}

dl {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
}

dt {
  font-weight: bold;
  color: #08060d;
}

dd {
  margin: 0;
}
</style>
