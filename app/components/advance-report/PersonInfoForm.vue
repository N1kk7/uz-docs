<template>
  <div class="person-form">
    <div class="row">
      <label class="field">
        <span class="field_label">Прізвище</span>
        <input v-model="modelValue.lastName" type="text" placeholder="Діденко" />
        <span v-if="errors.lastName" class="field_error">{{ errors.lastName }}</span>
      </label>
      <label class="field">
        <span class="field_label">Ім'я</span>
        <input v-model="modelValue.firstName" type="text" placeholder="Дмитро" />
        <span v-if="errors.firstName" class="field_error">{{ errors.firstName }}</span>
      </label>
      <label class="field">
        <span class="field_label">По батькові</span>
        <input v-model="modelValue.middleName" type="text" placeholder="Олександрович" />
      </label>
    </div>

    <div class="row">
      <label class="field field--narrow">
        <span class="field_label">Табельний номер</span>
        <input v-model="modelValue.tabNumber" type="text" class="mono" placeholder="16760" />
        <span v-if="errors.tabNumber" class="field_error">{{ errors.tabNumber }}</span>
      </label>

      <div class="field field--grow">
        <span class="field_label">Реєстраційний номер облікової картки (ІПН)</span>
        <DigitBoxInput
          v-model="modelValue.inn"
          :length="10"
          :has-error="!!errors.inn"
        />
        <span v-if="errors.inn" class="field_error">{{ errors.inn }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import DigitBoxInput from './DigitBoxInput.vue'

defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
})
</script>

<style lang="scss" scoped>
.person-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 200px;

  &--narrow {
    flex: 0 1 180px;
  }

  &--grow {
    flex: 1 1 320px;
  }

  &_label {
    @include text(0.75rem, 1.2, 500);
    color: var(--text-grey);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &_error {
    @include text(0.75rem, 1.2, 400);
    color: var(--error);
  }
}

input {
  @include text(0.95rem, 1.3, 400);
  padding: 11px 14px;
  background: var(--input-bg);
  border: 1px solid var(--border-subtle);
  color: var(--text-color);
  border-radius: 10px;
  transition: border-color ease 0.2s, box-shadow ease 0.2s;

  &::placeholder {
    color: var(--text-grey);
    opacity: 0.6;
  }

  &:hover {
    border-color: var(--border-subtle-hover);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-button);
    box-shadow: 0 0 0 3px rgba(145, 163, 229, 0.2);
  }

  &.mono {
    @include textMono(0.95rem, 1.3, 500);
  }
}
</style>