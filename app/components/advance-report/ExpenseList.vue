<!-- components/advance-report/ExpenseList.vue -->
<template>
  <div class="expenses">
    <div class="head">
      <h3>Витрати</h3>
      <button type="button" class="btn-add" @click="onAdd">+ додати витрату</button>
    </div>

    <span v-if="errors.expenses" class="error">{{ errors.expenses }}</span>

    <ExpenseRow
      v-for="(item, i) in items"
      :key="item.id"
      :item="item"
      :index="i"
      :errors="errors"
      :on-remove="onRemove"
    />

    <div class="total">
      <span>Усього</span>
      <strong>{{ total.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<script setup>
import ExpenseRow from './ExpenseRow.vue'

defineProps({
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  errors: { type: Object, default: () => ({}) },
  onAdd: { type: Function, required: true },
  onRemove: { type: Function, required: true },
})
</script>

<style lang="scss" scoped>
.expenses {
  display: flex;
  flex-direction: column;
  gap: 14px;
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

.btn-add {
  @include defaultButton;
  border-radius: 10px;
}

.total {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  padding-top: 10px;
  color: var(--text-color);
}

.error {
  @include text(0.8rem, 1.3, 400);
  color: #ff8a80;
}
</style>