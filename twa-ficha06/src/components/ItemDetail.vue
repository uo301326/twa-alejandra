
<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <h2>{{ item.name }}</h2>

    <dl>
      <dt>Category</dt>
      <dd>{{ item.category }}</dd>

      <dt>Price</dt>
      <dd>{{ item.price.toFixed(2) }} €</dd>

      <dt>Tags</dt>
      <dd>{{ item.tags.join(', ') }}</dd>

      <template v-for="(value, key) in item" :key="key">
        <template v-if="value && typeof value === 'object' && !Array.isArray(value)">
          <template v-for="(nestedValue, nestedKey) in value" :key="nestedKey">
            <dt>{{ key }}.{{ nestedKey }}</dt>
            <dd>{{ nestedValue }}</dd>
          </template>
        </template>
      </template>
    </dl>
  </section>
</template>


<style scoped>
section {
  margin-top: 25px;
  padding: 20px;
  border: 1px solid #e5e4e7;
  border-radius: 8px;
  background-color: #faf8fc;
}

h2 {
  color: #08060d;
  margin-bottom: 20px;
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


