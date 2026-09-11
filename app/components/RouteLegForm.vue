<template>
  <div class="leg">
    <h3 class="leg_title">{{ title }}</h3>

    <div class="leg_grid">
      <label class="field">
        <span>Дата</span>
        <input type="date" v-model="leg.form.date" />
      </label>

      <label class="field">
        <span>Явка на роботу</span>
        <input type="time" v-model="leg.form.yavka" />
      </label>

      <label class="field">
        <span>Прийомка локомотиву (хв)</span>
        <input type="number" min="0" v-model.number="leg.form.priyomkaMinutes" />
        <small v-if="leg.priyomkaAbsolute.value !== null">
          → {{ minutesToTime(leg.priyomkaAbsolute.value) }}
        </small>
      </label>

      <label class="field field--toggle">
        <span>
          <input type="checkbox" v-model="leg.form.useKpVyhid" />
          Час до КП вихід
        </span>
        <select v-model.number="leg.form.kpVyhidMinutes" :disabled="!leg.form.useKpVyhid">
          <option v-for="v in kpVyhidPresets" :key="v" :value="v">{{ v }} хв</option>
        </select>
        <small v-if="leg.form.useKpVyhid && leg.kpVyhidAbsolute.value !== null">
          → {{ minutesToTime(leg.kpVyhidAbsolute.value) }}
        </small>
      </label>

      <label class="field">
        <span>Час КП захід</span>
        <input type="time" v-model="leg.form.kpZahid" />
      </label>

      <label class="field field--hint">
        <span>Доп. зсув доби (якщо потрібно)</span>
        <input type="number" min="0" v-model.number="leg.form.kpZahidExtraDays" />
      </label>

      <label class="field">
        <span>Здача локомотиву (хв)</span>
        <input type="number" min="0" v-model.number="leg.form.sdachaMinutes" />
        <small v-if="leg.sdachaAbsolute.value !== null">
          → {{ minutesToTime(leg.sdachaAbsolute.value) }}
        </small>
      </label>

      <label class="field field--toggle">
        <span>
          <input type="checkbox" v-model="leg.form.useMedComissia" />
          Проходження мед. комісії (хв)
        </span>
        <input
          type="number"
          min="0"
          v-model.number="leg.form.medComissiaMinutes"
          :disabled="!leg.form.useMedComissia"
        />
      </label>

      <label class="field">
        <span>Кінець роботи (хв після здачі/мед. комісії)</span>
        <input type="number" min="0" v-model.number="leg.form.kinetsMinutes" />
      </label>

      <label class="field field--toggle">
        <span>
          <input type="checkbox" v-model="leg.form.useNagon" />
          Нагін (хв)
        </span>
        <input type="number" min="0" v-model.number="leg.form.nagonMinutes" :disabled="!leg.form.useNagon" />
      </label>
    </div>

    <div class="results">
      <div class="results_row">
        <span>Прийомка локомотиву</span>
        <b>{{ leg.priyomkaAbsolute.value !== null ? minutesToTime(leg.priyomkaAbsolute.value) : '—' }}</b>
      </div>
      <div class="results_row" v-if="leg.form.useKpVyhid">
        <span>КП вихід</span>
        <b>{{ leg.kpVyhidAbsolute.value !== null ? minutesToTime(leg.kpVyhidAbsolute.value) : '—' }}</b>
      </div>
      <div class="results_row">
        <span>Здача локомотиву</span>
        <b>{{ leg.sdachaAbsolute.value !== null ? minutesToTime(leg.sdachaAbsolute.value) : '—' }}</b>
      </div>
      <div class="results_row results_row--accent">
        <span>Кінець роботи</span>
        <b>{{ leg.endAbsolute.value !== null ? minutesToTime(leg.endAbsolute.value) : '—' }}</b>
      </div>
      <div class="results_row">
        <span>Тривалість роботи</span>
        <b>{{ formatDuration(leg.totalWorkMinutes.value) }}</b>
      </div>
      <div class="results_row">
        <span>Нічні години</span>
        <b>{{ formatDuration(leg.nightMinutes.value) }}</b>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimeCalc } from '../composables/useTimeCalc';
import { useRouteLeg } from '../composables/useRouteLeg';

const props = defineProps({
  cacheKey: { type: String, required: true },
  title: { type: String, required: true },
  overrides: { type: Object, default: () => ({}) },
});

const { minutesToTime, formatDuration } = useTimeCalc();
const kpVyhidPresets = [30, 40, 45, 51, 60];

const leg = useRouteLeg(props.cacheKey, props.overrides);

defineExpose({
  form: leg.form,
  yavkaAbsolute: leg.yavkaAbsolute,
  endAbsolute: leg.endAbsolute,
  totalWorkMinutes: leg.totalWorkMinutes,
  nightMinutes: leg.nightMinutes,
  clear: leg.clear,
});
</script>

<style lang="scss" scoped>
.leg {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--light-bg);
  border-radius: 15px;
  padding: 20px;

  &_title {
    @include text(1.1rem, 1.3, 700);
    color: var(--text-color);
  }
}

.leg_grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  @include text(0.9rem, 1.4, 500);
  color: var(--text-grey);

  input,
  select {
    @include text(1rem, 1.4);
    color: var(--text-color);
    background: var(--dark-bg);
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
    border-radius: 10px;
    padding: 10px 12px;

    &:disabled {
      opacity: 0.4;
    }
  }

  small {
    color: var(--accent-button);
  }

  &--toggle span {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-color);
  }

  &--hint {
    justify-content: flex-end;
  }
}

.results {
  border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
  padding-top: 12px;

  &_row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: var(--text-color);

    &--accent b {
      color: var(--accent-button);
    }
  }
}
</style>