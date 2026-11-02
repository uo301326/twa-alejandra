
<script setup>
import { computed, reactive } from 'vue'

defineProps({
  cats: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['save'])

const empty = {
  name: '',
  category: '',
  price: null,
  tags: ''
}

const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}

  if (form.name.length < 3) {
    e.name = 'at least 3 characters'
  }

  if (!form.category) {
    e.category = 'pick a category'
  }

  if (!(form.price > 0)) {
    e.price = 'must be > 0'
  }

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)


function submit() {
  if (!isValid.value) return

  emit('save', {
    name: form.name,
    category: form.category,
    price: form.price,
    tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean)
  })

  Object.assign(form, empty)
}

</script>


<template>
  <form @submit.prevent="submit">
    <h2>New item</h2>

    <label for="name">Name:</label>
    <input
      id="name"
      v-model.trim="form.name"
      required
      minlength="3"
    >
    <small v-if="errors.name">{{ errors.name }}</small>

    <label for="category">Category:</label>
    <select id="category" v-model="form.category" required>
      <option value="">Select a category</option>
      <option v-for="cat in cats" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>
    <small v-if="errors.category">{{ errors.category }}</small>

    <label for="price">Price:</label>
    <input
      id="price"
      v-model.number="form.price"
      type="number"
      min="0"
      step="0.01"
      required
    >
    <small v-if="errors.price">{{ errors.price }}</small>

    <label for="tags">Tags:</label>
    <input
      id="tags"
      v-model.trim="form.tags"
      placeholder="tags, comma separated"
    >

    <button type="submit" :disabled="!isValid">
      Save
    </button>
  </form>
</template>

<style scoped>
form {
  margin: 25px 0;
  padding: 20px;
  border: 1px solid #e5e4e7;
  border-radius: 8px;
  background-color: #faf8fc;
}

h2 {
  margin-top: 0;
  color: #08060d;
}

label {
  display: block;
  margin-top: 12px;
  font-weight: bold;
}

input, select {
  display: block;
  width: 100%;
  max-width: 350px;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

small {
  display: block;
  color: red;
  margin-top: 4px;
}

button {
  margin-top: 15px;
  padding: 9px 18px;
  border: none;
  border-radius: 5px;
  background-color: #aa3bff;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>

