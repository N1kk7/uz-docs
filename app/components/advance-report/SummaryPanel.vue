<template>
  <div class="summary">
    <h3>Підсумок звіту</h3>

    <div class="line">
      <span>Одержано</span>
      <b class="mono">{{ totalReceived.toFixed(2) }} ₴</b>
    </div>
    <div class="line">
      <span>Витрачено</span>
      <b class="mono">{{ totalSpent.toFixed(2) }} ₴</b>
    </div>
    <div class="line" v-if="balance !== null">
      <span>Залишок</span>



      



      <b class="mono success">{{ balance.toFixed(2) }} ₴</b>
    </div>
    <div class="line" v-if="overspent !== null">
      <span>Перевитрата</span>
      <b class="mono warn">{{ overspent.toFixed(2) }} ₴</b>
    </div>

    <div class="words">
      <p class="mono">{{ amountInWords }}</p>
      <span class="words_caption">(словами)</span>
    </div>
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
  gap: 12px;
}

h3 {
  @include textDisplay(1.05rem, 1.3, 600);
  color: var(--text-color);
  margin: 0 0 2px;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  @include text(0.875rem, 1.3, 400);
  color: var(--text-grey);

  b {
    color: var(--text-color);
    &.success { color: var(--success); }
    &.warn { color: var(--error); }
  }
}

.words {
  margin-top: 6px;
  padding-top: 14px;
  border-top: 2px solid var(--brass-dim);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--brass);
  }

  p {
    @include textMono(0.85rem, 1.4, 500);
    color: var(--text-color);
    margin: 0;
  }

  &_caption {
    @include text(0.7rem, 1.2, 400);
    color: var(--text-grey);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
}

.mono { @include textMono(0.9rem, 1.3, 500); }
</style>