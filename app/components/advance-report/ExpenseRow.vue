
<template>
  <div class="expense-row">
    <span class="idx">{{ index + 1 }}</span>
    <div class="field">
      <input v-model="item.date" type="date" />
      <span v-if="errors[`expense_${index}_date`]" class="error">{{ errors[`expense_${index}_date`] }}</span>
    </div>
    <div class="field grow">
      <input v-model="item.description" type="text" placeholder="Кому, за що і на підставі якого документа" />
      <span v-if="errors[`expense_${index}_description`]" class="error">{{ errors[`expense_${index}_description`] }}</span>
    </div>
    <div class="field">
      <input v-model.number="item.amount" type="number" step="0.01" min="0" placeholder="0.00" />
      <span v-if="errors[`expense_${index}_amount`]" class="error">{{ errors[`expense_${index}_amount`] }}</span>
    </div>
    <button type="button" class="btn-remove" @click="onRemove(item.id)">✕</button>
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
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.idx {
  width: 20px;
  padding-top: 10px;
  color: var(--text-grey);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.grow {
    flex: 1;
  }
}

input {
  @include text(0.9rem, 1.4, 400);
  padding: 8px 10px;
  background: var(--light-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  color: var(--text-color);
  border-radius: 10px;
  width: 100%;
  transition: border-color ease 0.3s;

  &:focus {
    outline: none;
    border-color: var(--accent-button);
  }
}

.error {
  @include text(0.75rem, 1.3, 400);
  color: #ff8a80;
}

.btn-remove {
  margin-top: 4px;
  cursor: pointer;
  background: var(--secondary-btn);
  color: var(--text-color);
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  transition: background ease 0.3s;

  &:hover {
    background: var(--light-bg-hover);
  }
}
</style>