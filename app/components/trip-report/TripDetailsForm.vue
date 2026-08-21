<template>
  <div class="form-grid">
    <div class="row">
      <label class="field">
        <span class="field_label">Дата наказу</span>
        <input v-model="modelValue.orderDate" type="date" class="mono" />
        <span v-if="errors.orderDate" class="field_error">{{ errors.orderDate }}</span>
      </label>
      <label class="field">
        <span class="field_label">№ наказу</span>
        <input v-model="modelValue.orderNumber" type="text" class="mono" placeholder="350/ВД" />
        <span v-if="errors.orderNumber" class="field_error">{{ errors.orderNumber }}</span>
      </label>
    </div>

    <label class="field field--wide">
      <span class="field_label">Місто відрядження</span>
      <input v-model="modelValue.city" type="text" placeholder="Львів" />
      <span v-if="errors.city" class="field_error">{{ errors.city }}</span>
    </label>

    <label class="field field--wide">
      <span class="field_label">Виробничий підрозділ (місце відрядження)</span>
      <input v-model="modelValue.department" type="text" placeholder="Локомотивне депо Львів - Захід" />
      <span v-if="errors.tripDepartment" class="field_error">{{ errors.tripDepartment }}</span>
    </label>

    <div class="row">
      <label class="field">
        <span class="field_label">Філія</span>
        <input v-model="modelValue.branch" type="text" />
      </label>
      <label class="field">
        <span class="field_label">Товариство</span>
        <input v-model="modelValue.company" type="text" />
      </label>
    </div>

    <div class="row">
      <label class="field">
        <span class="field_label">Дата з</span>
        <input v-model="modelValue.dateFrom" type="date" class="mono" />
        <span v-if="errors.dateFrom" class="field_error">{{ errors.dateFrom }}</span>
      </label>
      <label class="field">
        <span class="field_label">Дата по</span>
        <input v-model="modelValue.dateTo" type="date" class="mono" />
        <span v-if="errors.dateTo" class="field_error">{{ errors.dateTo }}</span>
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
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  .field { flex: 1 1 160px; }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--wide { flex: 1 1 100%; }

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

  &.mono { @include textMono(0.9rem, 1.3, 500); }
}
</style>