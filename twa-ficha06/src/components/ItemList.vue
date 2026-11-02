
<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  selectedId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['select'])
</script>

<template>
  <ul>
    <li
      v-for="item in props.items"
      :key="item.id"
      :class="{ selected: item.id === props.selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>


<style scoped>
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
</style>

