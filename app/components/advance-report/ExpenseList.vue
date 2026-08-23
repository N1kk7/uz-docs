<template>
  <div class="expenses">
    <div class="head">
      <h3>Витрати</h3>
      <button type="button" class="btn-add" @click="onAdd">+ додати витрату</button>
    </div>

    <span v-if="errors.expenses" class="head_error">{{ errors.expenses }}</span>

    <div v-if="items.length" class="table-head">
      <span></span>
      <span>Дата</span>
      <span>Опис</span>
      <span class="right">Сума</span>
      <span></span>
    </div>




    
    <div class="rows">
      <ExpenseRow
        v-for="(item, i) in items"
        :key="item.id"
        :item="item"
        :index="i"
        :errors="errors"
        :on-remove="onRemove"
      />
    </div>

    <div v-if="!items.length" class="empty">
      Ще немає жодної витрати — додайте першу, натиснувши кнопку вище.
    </div>

    <div class="total">
      <span>Усього витрачено</span>
      <strong class="mono">{{ total.toFixed(2) }} ₴</strong>
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
}

h3 {
  @include textDisplay(1.05rem, 1.3, 600);
  color: var(--text-color);
  margin: 0;
}

.head_error {
  @include text(0.8rem, 1.2, 400);
  color: var(--error);
}

.btn-add {
  @include text(0.875rem, 1.2, 500);
  cursor: pointer;
  padding: 10px 18px;
  background: var(--main-accent);
  color: var(--text-color);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  transition: all ease 0.2s;

  &:hover { background: var(--hover-btn); }
}

.table-head {
  display: grid;
  grid-template-columns: 28px 150px 1fr 130px 32px;
  gap: 10px;
  @include text(0.7rem, 1.2, 500);
  color: var(--text-grey);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0 2px;

  .right { text-align: right; }

  @media screen and (max-width: 640px) {
    display: none;
  }
}

.rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  @include text(0.875rem, 1.4, 400);
  color: var(--text-grey);
  padding: 20px;
  text-align: center;
  border: 1px dashed var(--border-subtle);
  border-radius: 10px;
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

.mono { @include textMono(0.9rem, 1.3, 500); }
</style>