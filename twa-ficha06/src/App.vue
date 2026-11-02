
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Catalog</RouterLink>
      |
      <RouterLink to="/items/new">New item</RouterLink>
      |
      <RouterLink to="/pokemon">Pokémon</RouterLink>
</nav>
  </header>

  <RouterView />
</template>

