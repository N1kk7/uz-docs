<template>
  <div class="expense-row">
    <span class="badge">{{ index + 1 }}</span>

    <div class="field">
      <input v-model="item.date" type="date" class="mono" />
      <span v-if="errors[`expense_${index}_date`]" class="field_error">{{ errors[`expense_${index}_date`] }}</span>
    </div>

    <div class="field grow">
      <input v-model="item.description" type="text" placeholder="Кому, за що і на підставі якого документа" />
      <span v-if="errors[`expense_${index}_description`]" class="field_error">{{ errors[`expense_${index}_description`] }}</span>
    </div>

    <div class="field amount">
      <input v-model.number="item.amount" type="number" step="0.01" min="0" class="mono" placeholder="0.00" />
      <span v-if="errors[`expense_${index}_amount`]" class="field_error">{{ errors[`expense_${index}_amount`] }}</span>
    </div>

    <button type="button" class="btn-icon" title="Видалити" @click="onRemove(item.id)">✕</button>
  </div>





  







</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  index: { type: Number, required: true },
  errors: { type: Object, default: () => ({}) },
  onRemove: { type: Function, required: true },

})
</script>

<style lang="scss" scoped>
.expense-row {
  display: grid;
  grid-template-columns: 28px 150px 1fr 130px 32px;
  gap: 10px;
  align-items: start;
}

.badge {
  @include textMono(0.8rem, 1, 600);
  width: 28px;
  height: 28px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--secondary-btn);
  color: var(--text-color);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.grow { min-width: 0; }
  &.amount input { text-align: right; }
}

.field_error {
  @include text(0.7rem, 1.2, 400);
  color: var(--error);
}

input {
  @include text(0.9rem, 1.3, 400);
  padding: 9px 12px;
  background: var(--input-bg);
  border: 1px solid var(--border-subtle);
  color: var(--text-color);
  border-radius: 8px;
  width: 100%;
  transition: border-color ease 0.2s;

  &::placeholder { color: var(--text-grey); opacity: 0.6; }
  &:hover { border-color: var(--border-subtle-hover); }
  &:focus {
    outline: none;
    border-color: var(--accent-button);
    box-shadow: 0 0 0 3px rgba(145, 163, 229, 0.2);
  }

  &.mono { @include textMono(0.9rem, 1.3, 500); }
}

.btn-icon {
  width: 32px;
  height: 32px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  color: var(--text-grey);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  transition: all ease 0.2s;

  &:hover { color: var(--error); border-color: var(--error); }
}

@media screen and (max-width: 640px) {
  .expense-row {
    grid-template-columns: 1fr;
    padding: 12px;
    background: var(--input-bg);
    border-radius: 10px;
    position: relative;

    .badge { position: absolute; top: 12px; right: 44px; }
    .btn-icon { position: absolute; top: 10px; right: 8px; }
  }
}
</style>