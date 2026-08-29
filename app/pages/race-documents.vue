<template>
  <div class="race-page">
    <header class="race-page_head">
      <h1>Маршрутні листи</h1>
    </header>

    <RaceTabsNav :tabs="tabs" />

    <div class="race-page_content">
      <NuxtPage />
    </div>
  </div>



  
</template>




<script setup>
import RaceTabsNav from '../components/RaceTabsNav.vue';

const tabs = [
  { to: '/race-documents/single-route', label: 'Один маршрут за зміну' },
  { to: '/race-documents/double-route', label: 'Два маршрути за зміну' },
  { to: '/race-documents/rest-calculator', label: 'Калькулятор перевідпочинку' },
];
</script>

<style lang="scss" scoped>
.race-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  gap: 20px;
  background: var(--bg-color);
  padding-bottom: 20px;

  &_head {
    display: flex;
    align-items: center;
    padding: 20px;
    background: var(--main-accent);
    width: 100%;

    h1 {
      @include text(1.6rem, 1.3, 600);
      color: var(--active-btn);
    }
  }

  &_content {
    width: 97vw;
  }
}
</style>