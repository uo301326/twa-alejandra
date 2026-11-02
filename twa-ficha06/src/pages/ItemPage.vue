
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import ItemDetail from '../components/ItemDetail.vue'
import { items, status, ensureLoaded } from '../store.js'

// Obtener la ruta actual
const route = useRoute()

// Cargar los productos al entrar en la página
onMounted(ensureLoaded)

// Obtener el ID de la URL
const id = computed(() => Number(route.params.id))

// Buscar el producto correspondiente
const item = computed(() => {
  return (items.value ?? []).find((i) => i.id === id.value)
})
</script>

<template>
  <main>
    <RouterLink to="/">← Items</RouterLink>

    <p v-if="status !== 'ready'">
      Loading…
    </p>

    <p v-else-if="!item">
      Item {{ id }} not found
    </p>

    <ItemDetail
      v-else
      :item="item"
    />
  </main>
</template>
