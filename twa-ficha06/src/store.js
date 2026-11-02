
import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

// Estado global de los productos
export const items = ref(null)
export const status = ref('idle')
export const error = ref(null)

// Cargar los productos
export async function load() {
  status.value = 'loading'
  error.value = null

  try {
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (e) {
    error.value = e.message
    status.value = 'error'
  }
}

// Comprobar si hay que cargar los productos
export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') {
    load()
  }
}

// Calcular el siguiente identificador
const nextId = () => Math.max(0, ...items.value.map((i) => i.id)) + 1

// Añadir un producto
export function addItem(item) {
  const id = nextId()
  items.value.push({ id, ...item })
  return id
}


