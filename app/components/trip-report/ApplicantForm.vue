<template>
  <div class="form-grid">
    <label class="field field--wide">
      <span class="field_label">Посада заявника</span>
      <input v-model="modelValue.position" type="text" placeholder="машиніст електровоза" />
      <span v-if="errors.applicantPosition" class="field_error">{{ errors.applicantPosition }}</span>
    </label>

    <div class="row">
      <label class="field">
        <span class="field_label">Прізвище</span>
        <input v-model="modelValue.lastName" type="text" placeholder="Діденко" />
        <span v-if="errors.applicantLastName" class="field_error">{{ errors.applicantLastName }}</span>
      </label>
      <label class="field">
        <span class="field_label">Ім'я</span>
        <input v-model="modelValue.firstName" type="text" placeholder="Дмитро" />
        <span v-if="errors.applicantFirstName" class="field_error">{{ errors.applicantFirstName }}</span>
      </label>
      <label class="field">
        <span class="field_label">По батькові</span>
        <input v-model="modelValue.middleName" type="text" placeholder="Олександрович" />
      </label>
    </div>

    <label class="field field--narrow">
      <span class="field_label">Табельний номер</span>
      <input v-model="modelValue.tabNumber" type="text" class="mono" placeholder="16760" />
      <span v-if="errors.applicantTabNumber" class="field_error">{{ errors.applicantTabNumber }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
})
</script>

<style lang="scss" scoped>
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  flex: 1 1 160px;

  &--wide { flex: 1 1 100%; }
  &--narrow { flex: 0 1 180px; }

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

  &::placeholder { color: var(--text-grey); opacity: 0.6; }
  &:hover { border-color: var(--border-subtle-hover); }
  &:focus {
    outline: none;
    border-color: var(--accent-button);
    box-shadow: 0 0 0 3px rgba(145, 163, 229, 0.2);
  }

  &.mono { @include textMono(0.95rem, 1.3, 500); }
}
</style>