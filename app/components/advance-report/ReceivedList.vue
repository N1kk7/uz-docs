<template>
  <div class="received">
    <div class="head">
      <h3>Одержано авансу</h3>
      <button type="button" class="btn-ghost" :disabled="items.length >= 3" @click="onAdd">
        + додати рядок
      </button>
    </div>

    <div v-for="(item, i) in items" :key="item.id" class="row">
      <span class="badge">{{ i + 1 }}</span>
      <input v-model="item.source" type="text" placeholder="від кого, № та дата" />
      <input v-model.number="item.amount" type="number" step="0.01" min="0" class="mono amount" placeholder="0.00" />
      <button type="button" class="btn-icon" title="Видалити" @click="onRemove(item.id)">✕</button>
    </div>

    <div class="total">
      <span>Усього отримано</span>
      <strong class="mono">{{ total.toFixed(2) }} ₴</strong>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  onAdd: { type: Function, required: true },
  onRemove: { type: Function, required: true },
})
</script>

<style lang="scss" scoped>
.received {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3 {
  @include textDisplay(1.05rem, 1.3, 600);
  color: var(--text-color);
  margin: 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  @include textMono(0.8rem, 1, 600);
  width: 24px;
  height: 24px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--secondary-btn);
  color: var(--text-color);
}

input {
  @include text(0.9rem, 1.3, 400);
  padding: 9px 12px;
  background: var(--input-bg);
  border: 1px solid var(--border-subtle);
  color: var(--text-color);
  border-radius: 8px;
  flex: 1;
  transition: border-color ease 0.2s;

  &::placeholder { color: var(--text-grey); opacity: 0.6; }
  &:hover { border-color: var(--border-subtle-hover); }
  &:focus {
    outline: none;
    border-color: var(--accent-button);
    box-shadow: 0 0 0 3px rgba(145, 163, 229, 0.2);
  }

  &.amount {
    flex: none;
    width: 130px;
    text-align: right;
  }
}

.mono { @include textMono(0.9rem, 1.3, 500); }

.btn-ghost {
  @include text(0.85rem, 1.2, 500);
  cursor: pointer;
  background: transparent;
  color: var(--accent-button);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 7px 12px;
  transition: all ease 0.2s;

  &:hover:not(:disabled) {
    border-color: var(--accent-button);
    background: rgba(145, 163, 229, 0.08);
  }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
}

.btn-icon {
  flex: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--text-grey);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  transition: all ease 0.2s;

  &:hover {
    color: var(--error);
    border-color: var(--error);
  }
}








.total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1px solid var(--border-subtle);
  padding-top: 12px;
  color: var(--text-color);

  strong { @include textMono(1.05rem, 1.2, 600); }
}
</style>