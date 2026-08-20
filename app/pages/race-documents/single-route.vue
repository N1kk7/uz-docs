<template>
  <div class="single-route">
    <RouteLegForm ref="legRef" cache-key="single-route-leg" title="Маршрут" />

    <div class="summary">
      <h3>Підсумок поїздки</h3>

      <div class="summary_row">
        <span>Дата</span>
        <b>{{ legRef?.form?.date || '—' }}</b>
      </div>
      <div class="summary_row">
        <span>Загальна тривалість роботи</span>
        <b>{{ formatDuration(legRef?.totalWorkMinutes?.value) }}</b>
      </div>
      <div class="summary_row">
        <span>Нічні години</span>
        <b>{{ formatDuration(legRef?.nightMinutes?.value) }}</b>
      </div>
    </div>

    <div class="actions">
      <button class="actions_clear" @click="clearAll">Очистити</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RouteLegForm from '../../components/RouteLegForm.vue';
import { useTimeCalc } from '../../composables/useTimeCalc';

const { formatDuration } = useTimeCalc();

const legRef = ref(null);

function clearAll() {
  legRef.value?.clear();
}
</script>

<style lang="scss" scoped>
.single-route {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

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