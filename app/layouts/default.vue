<template>
  <div class="layout">
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// import AppFooter from "~/components/AppFooter.vue";
// import AppHeader from "~/components/AppHeader.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color);
  overflow: hidden;
}
main {
  flex: 1;
  z-index: 1;
  overflow: hidden;
}
</style>
