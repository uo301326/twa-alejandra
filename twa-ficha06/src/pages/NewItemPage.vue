
<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import ItemForm from '../components/ItemForm.vue'
import { items, addItem } from '../store.js'
import { categories } from '../catalog.js'

const router = useRouter()

// Obtener las categorías disponibles
const cats = computed(() => {
  return categories(items.value ?? [])
})

// Guardar el producto y navegar a su detalle
function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <main>
    <RouterLink to="/">← Items</RouterLink>

    <h1>New item</h1>

    <ItemForm
      :cats="cats"
      @save="onSave"
    />
  </main>
</template>
