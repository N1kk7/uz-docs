<template>
  <div class="rest-calculator-page">
    <RestCalculator cache-key="standalone-rest-calculator" />
  </div>
</template>

<script setup>
import RestCalculator from '../../components/RestCalculator.vue';
</script>

<style lang="scss" scoped>
.rest-calculator-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>