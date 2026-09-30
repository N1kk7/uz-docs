<template>
  <div class="double-route">
    <RouteLegForm ref="leg1Ref" cache-key="double-route-leg1" title="Маршрут 1" />

    <div class="rest-block" v-if="restData">
      <h3>Відпочинок між маршрутами</h3>

      <div class="rest-block_row">
        <span>Доступний час між маршрутами</span>
        <b>{{ formatDuration(restData.availableRest) }}</b>
      </div>
      <div class="rest-block_row">
        <span>Відпочинок (не менше 3 год / половина зміни)</span>
        <b>{{ formatDuration(restData.rest) }}</b>
      </div>
      <div class="rest-block_row">
        <span>Переотдих</span>
        <b>{{ formatDuration(restData.overRest) }}</b>
      </div>

      <p v-if="restData.availableRest < minRestRequired" class="rest-block_warning">
        Недостатньо часу на відпочинок: потрібно щонайменше {{ formatDuration(minRestRequired) }},
        доступно {{ formatDuration(restData.availableRest) }}.
      </p>
    </div>

    <RouteLegForm ref="leg2Ref" cache-key="double-route-leg2" title="Маршрут 2" />

    <div class="summary">
      <h3>Підсумок поїздки</h3>

      <div class="summary_row">
        <span>Період</span>
        <b>{{ dateRangeLabel }}</b>
      </div>
      <div class="summary_row">
        <span>Загальна тривалість роботи (2 маршрути)</span>
        <b>{{ formatDuration(totalWorkMinutes) }}</b>
      </div>
      <div class="summary_row">
        <span>Загальні нічні години</span>
        <b>{{ formatDuration(totalNightMinutes) }}</b>
      </div>
    </div>

    <div class="actions">
      <button class="actions_clear" @click="clearAll">Очистити обидва маршрути</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RouteLegForm from '../../components/RouteLegForm.vue';
import { useTimeCalc } from '../../composables/useTimeCalc';

const { calcRest, formatDuration } = useTimeCalc();

const leg1Ref = ref(null);
const leg2Ref = ref(null);

const restData = computed(() => {
  if (!leg1Ref.value || !leg2Ref.value) return null;

  const endFirst = leg1Ref.value.endAbsolute.value;
  const shiftMinutes = leg1Ref.value.totalWorkMinutes.value;
  const yavkaSecond = leg2Ref.value.yavkaAbsolute.value;

  if (endFirst === null || shiftMinutes === null) return null;

  return calcRest(shiftMinutes, endFirst, yavkaSecond);
});

const minRestRequired = computed(() => {
  if (!leg1Ref.value) return 180;
  const shift = leg1Ref.value.totalWorkMinutes.value;
  return shift ? Math.max(Math.round(shift / 2), 180) : 180;
});

const totalWorkMinutes = computed(() => {
  if (!leg1Ref.value || !leg2Ref.value) return null;
  const a = leg1Ref.value.totalWorkMinutes.value;
  const b = leg2Ref.value.totalWorkMinutes.value;
  if (a === null || b === null) return null;
  return a + b;
});

const totalNightMinutes = computed(() => {
  if (!leg1Ref.value || !leg2Ref.value) return null;
  return (leg1Ref.value.nightMinutes.value || 0) + (leg2Ref.value.nightMinutes.value || 0);
});

const dateRangeLabel = computed(() => {
  const d1 = leg1Ref.value?.form?.date;
  const d2 = leg2Ref.value?.form?.date;
  if (!d1 && !d2) return '—';
  if (d1 && d2 && d1 !== d2) return `${d1} — ${d2}`;
  return d1 || d2;
});

function clearAll() {
  leg1Ref.value?.clear();
  leg2Ref.value?.clear();
}
</script>

<style lang="scss" scoped>
.double-route {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rest-block,
.summary {
  background: var(--dark-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    @include text(1.1rem, 1.3, 700);
    color: var(--text-color);
    margin-bottom: 6px;
  }

  &_row {
    display: flex;
    justify-content: space-between;
    color: var(--text-color);
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

    &:active {
      background: var(--light-bg-hover);
    }
  }
}
</style>