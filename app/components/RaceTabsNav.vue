<template>
  <nav class="tabs">
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="tabs_item"
      active-class="tabs_item--active"
    >
      {{ tab.label }}
    </NuxtLink>
  </nav>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true }, // [{ to, label }]
});
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  width: 97vw;
  padding: 4px;
  background: var(--dark-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  border-radius: 14px;

  &::-webkit-scrollbar {
    display: none;
  }

  &_item {
    flex-shrink: 0;
    @include text(0.95rem, 1.4, 500);
    color: var(--text-grey);
    padding: 10px 16px;
    border-radius: 10px;
    white-space: nowrap;
    transition: all ease 0.3s;

    &--active {
      background: var(--secondary-btn);
      color: var(--text-color);
    }

    @media screen and (min-width: 1024px) {
      &:hover:not(&--active) {
        background: var(--light-bg-hover);
        color: var(--text-color);
      }
    }
  }
}
</style>