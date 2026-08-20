<template>
  <div class="received">
    <div class="head">
      <h3>Одержано</h3>
      <button type="button" class="btn-add" :disabled="items.length >= 3" @click="onAdd">
        + додати
      </button>
    </div>

    <div v-for="(item, i) in items" :key="item.id" class="row">
      <span class="idx">{{ i + 1 }}.</span>
      <input v-model="item.source" type="text" placeholder="від кого, № та дата" />
      <input v-model.number="item.amount" type="number" step="0.01" min="0" placeholder="0.00" />
      <button type="button" class="btn-remove" @click="onRemove(item.id)">✕</button>
    </div>

    <div class="total">
      <span>Усього отримано</span>
      <strong>{{ total.toFixed(2) }}</strong>
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
  gap: 12px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    @include text(1.1rem, 1.3, 700);
    color: var(--text-color);
    margin: 0;
  }
}

.row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.idx {
  width: 20px;
  color: var(--text-grey);
}

input {
  @include text(0.9rem, 1.4, 400);
  padding: 8px 10px;
  background: var(--light-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  color: var(--text-color);
  border-radius: 10px;
  flex: 1;
  transition: border-color ease 0.3s;

  &:focus {
    outline: none;
    border-color: var(--accent-button);
  }

  &[type='number'] {
    max-width: 140px;
    flex: none;
  }
}

.btn-add,
.btn-remove {
  cursor: pointer;
  background: var(--secondary-btn);
  color: var(--text-color);
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  transition: background ease 0.3s;

  &:hover {
    background: var(--light-bg-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.btn-remove {
  padding: 8px 12px;
}

.total {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  padding-top: 10px;
  color: var(--text-color);
}
</style>