<template>
  <li class="feature-card">
    <NuxtLink :to="to">
      <span class="feature-card_icon">
        <img :src="icon" alt="" />
      </span>
      <p>{{ label }}</p>
    </NuxtLink>
  </li>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
.feature-card {
  width: 100%;
  background: var(--light-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  border-radius: 15px;
  padding: 25px 15px;
  transition: transform 0.25s ease, background 0.25s ease;

  a {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &_icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: var(--secondary-btn);

    img {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
  }

  p {
    @include text(1.2rem, 1.4, 500);
    color: var(--text-color);
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (min-width: 1024px) {
    &:hover {
      background: var(--light-bg-hover);
      transform: translateY(-2px);
    }
  }
}
</style>