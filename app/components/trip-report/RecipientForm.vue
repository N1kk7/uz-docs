
<template>
  <div class="form-grid">
    <label class="field field--wide">
      <span class="field_label">Посада адресата</span>
      <input v-model="modelValue.position" type="text" placeholder="Начальнику виробничого підрозділу" />
    </label>

    <label class="field field--wide">
      <span class="field_label">Підрозділ</span>
      <input v-model="modelValue.department" type="text" placeholder="Електровозне депо Харків - Головне" />
      <span v-if="errors.recipientDepartment" class="field_error">{{ errors.recipientDepartment }}</span>
    </label>

    <label class="field field--wide">
      <span class="field_label">ПІБ керівника (у давальному відмінку)</span>
      <input v-model="modelValue.headName" type="text" placeholder="Олександру Бартновському" />
      <span v-if="errors.recipientHeadName" class="field_error">{{ errors.recipientHeadName }}</span>
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

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;

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
}
</style>