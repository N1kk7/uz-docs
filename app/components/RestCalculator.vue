<template>
  <div class="rest-calc">
    <div class="rest-calc_grid">
      <label class="field">
        <span>Дата кінця старого маршруту</span>
        <input type="date" v-model="form.oldDate" />
      </label>

      <label class="field">
        <span>Час кінця старого маршруту</span>
        <input type="time" v-model="form.oldTime" />
      </label>

      <label class="field">
        <span>Дата явки нового маршруту</span>
        <input type="date" v-model="form.newDate" />
      </label>

      <label class="field">
        <span>Час явки нового маршруту</span>
        <input type="time" v-model="form.newTime" />
      </label>

      <label class="field field--full">
        <span>Тривалість зміни старого маршруту (год і хв)</span>
        <div class="field_pair">
          <input type="number" min="0" v-model.number="form.shiftHours" placeholder="год" />
          <input type="number" min="0" max="59" v-model.number="form.shiftMinutes" placeholder="хв" />
        </div>
      </label>
    </div>

    <div class="results" v-if="hasResult">
      <div class="results_row">
        <span>Доступний час між маршрутами</span>
        <b>{{ formatDuration(availableRest) }}</b>
      </div>
      <div class="results_row">
        <span>Мінімально необхідний відпочинок</span>
        <b>{{ formatDuration(minRestRequired) }}</b>
      </div>
      <div class="results_row results_row--accent">
        <span>Відпочинок</span>
        <b>{{ formatDuration(rest.rest) }}</b>
      </div>
      <div class="results_row results_row--accent">
        <span>Переотдих</span>
        <b>{{ formatDuration(rest.overRest) }}</b>
      </div>
      <div class="results_row">
        <span>Нічні години в цей період</span>
        <b>{{ formatDuration(nightMinutes) }}</b>
      </div>

      <p v-if="availableRest < minRestRequired" class="results_warning">
        Недостатньо часу на відпочинок: потрібно щонайменше {{ formatDuration(minRestRequired) }},
        доступно лише {{ formatDuration(availableRest) }}.
      </p>
      <p v-else-if="availableRest < 0" class="results_warning">
        Явка нового маршруту раніше за кінець старого — перевірте дати/час.
      </p>
    </div>

    <div class="actions">
      <button class="actions_clear" @click="clearAll">Очистити</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useTimeCalc } from '../composables/useTimeCalc';
import { useRouteCache } from '../composables/useRouteCache';

const props = defineProps({
  cacheKey: { type: String, default: 'rest-calculator' },
});

const { diffMinutesBetweenDates, nightMinutesBetweenDates, formatDuration, calcRest } = useTimeCalc();

const cache = useRouteCache(props.cacheKey);

const defaultForm = {
  oldDate: '',
  oldTime: '',
  newDate: '',
  newTime: '',
  shiftHours: null,
  shiftMinutes: null,
};

const form = reactive({ ...defaultForm, ...(cache.load() || {}) });

watch(form, (val) => cache.save(val), { deep: true });

function clearAll() {
  Object.assign(form, defaultForm);
  cache.clear();
}

const shiftTotalMinutes = computed(() => {
  const h = Number(form.shiftHours || 0);
  const m = Number(form.shiftMinutes || 0);
  const total = h * 60 + m;
  return total > 0 ? total : null;
});

const availableRest = computed(() =>
  diffMinutesBetweenDates(form.oldDate, form.oldTime, form.newDate, form.newTime)
);

const nightMinutes = computed(() =>
  nightMinutesBetweenDates(form.oldDate, form.oldTime, form.newDate, form.newTime)
);

const minRestRequired = computed(() => {
  if (!shiftTotalMinutes.value) return 180; // если тривалість зміни не вказана — мінімум 3 год
  return Math.max(Math.round(shiftTotalMinutes.value / 2), 180);
});

const rest = computed(() => {
  if (availableRest.value === null) return { rest: null, overRest: null };
  const shift = shiftTotalMinutes.value || 360; // якщо зміна не вказана, беремо умовно 6 год (мін. відпочинок все одно 3 год)
  return calcRest(shift, 0, Math.max(availableRest.value, 0));
});

const hasResult = computed(
  () => form.oldDate && form.oldTime && form.newDate && form.newTime
);

defineExpose({
  form,
  availableRest,
  rest,
  nightMinutes,
  clear: clearAll,
});
</script>

<style lang="scss" scoped>
.rest-calc {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--light-bg);
  border-radius: 15px;
  padding: 20px;
}

.rest-calc_grid {
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

  input {
    @include text(1rem, 1.4);
    color: var(--text-color);
    background: var(--dark-bg);
    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));
    border-radius: 10px;
    padding: 10px 12px;
  }

  &--full {
    @media screen and (min-width: 768px) {
      grid-column: span 2;
    }
  }

  &_pair {
    display: flex;
    gap: 10px;

    input {
      width: 100%;
    }
  }
}

.results {
  border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &_row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: var(--text-color);

    &--accent b {
      color: var(--accent-button);
    }
  }

  &_warning {
    margin-top: 8px;
    color: #ff8a80;
    @include text(0.9rem, 1.4);
  }
}

.actions {
  display: flex;

  &_clear {
    @include defaultButton;
    background: var(--secondary-btn);
    color: var(--text-color);
    border-radius: 10px;
    align-self: flex-start;

    &:active {
      background: var(--light-bg-hover);
    }
  }
}
</style>