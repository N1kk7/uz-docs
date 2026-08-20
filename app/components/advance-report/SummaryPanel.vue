<!-- components/advance-report/SummaryPanel.vue -->
<template>
  <div class="summary">
    <h3>Підсумок</h3>
    <div class="line"><span>Одержано</span><b>{{ totalReceived.toFixed(2) }}</b></div>
    <div class="line"><span>Витрачено</span><b>{{ totalSpent.toFixed(2) }}</b></div>
    <div class="line" v-if="balance !== null"><span>Залишок</span><b>{{ balance.toFixed(2) }}</b></div>
    <div class="line" v-if="overspent !== null"><span>Перевитрата</span><b>{{ overspent.toFixed(2) }}</b></div>
    <div class="line words"><span>Сума словами</span><b>{{ amountInWords }}</b></div>
  </div>
</template>

<script setup>
defineProps({
  totalReceived: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  balance: { type: Number, default: null },
  overspent: { type: Number, default: null },
  amountInWords: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    @include text(1.1rem, 1.3, 700);
    color: var(--text-color);
    margin: 0 0 4px;
  }
}

.line {
  display: flex;
  justify-content: space-between;
  color: var(--text-color);

  &.words {
    flex-direction: column;
    gap: 4px;
  }
}
</style>