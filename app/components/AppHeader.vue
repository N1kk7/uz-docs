<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
    <img class="app-header_logo" :src="logo" alt="logo" />
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Головна' },
  logo: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--main-accent);
  width: 100%;



  

  h1 {
    @include text(1.8rem, 1.3, 600);
    color: var(--active-btn);
  }

  &_logo {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
}
</style>