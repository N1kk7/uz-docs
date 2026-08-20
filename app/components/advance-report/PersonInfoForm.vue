<template>
  <div class="person-form">
    <div class="row">
      <label>
        <span>Прізвище</span>
        <input v-model="modelValue.lastName" type="text" />
        <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
      </label>
      <label>
        <span>Ім'я</span>
        <input v-model="modelValue.firstName" type="text" />
        <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
      </label>
      <label>
        <span>По батькові</span>
        <input v-model="modelValue.middleName" type="text" />
      </label>
    </div>
    <div class="row">
      <label>
        <span>Табельний номер</span>
        <input v-model="modelValue.tabNumber" type="text" />
        <span v-if="errors.tabNumber" class="error">{{ errors.tabNumber }}</span>
      </label>
      <label>
        <span>ІПН</span>
        <input v-model="modelValue.inn" type="text" inputmode="numeric" maxlength="10" />
        <span v-if="errors.inn" class="error">{{ errors.inn }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
})
</script>

<style lang="scss" scoped>
.person-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 200px;

  span:first-child {
    @include text(0.85rem, 1.3, 400);
    color: var(--text-grey);
  }
}

input {
  @include text(0.95rem, 1.4, 400);
  padding: 10px 12px;
  background: var(--light-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  color: var(--text-color);
  border-radius: 10px;
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
</style>