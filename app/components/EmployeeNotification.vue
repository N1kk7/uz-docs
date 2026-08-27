<template>
  <div class="notification">
    <div class="notification_icon">👤</div>

    <div class="notification_body">
      <div class="notification_message">
        <p>{{ line1 }}</p>
        <p>{{ line2 }}</p>
      </div>

      <button class="notification_button" @click="$emit('find')">
        <span>Знайти працівника</span>
      </button>
    </div>
  </div>


  



  
</template>

<script setup>
defineProps({
  line1: {
    type: String,
    default:
      'Якщо ви вже працювали в системі або раніше створювали документи, рекомендуємо скористатися функцією вибору працівника.',
  },
  line2: {
    type: String,
    default:
      'Це дозволить автоматично підставляти збережені дані та значно скоротить час на заповнення форм.',
  },
});
defineEmits(['find']);
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: var(--light-bg);
  border-radius: 20px;
  border-left: 4px solid var(--accent-button);
  padding: 20px;
  width: 90vw;

  &_icon {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--secondary-btn);
    font-size: 1.3rem;
  }

  &_body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  &_message {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      @include text(1rem, 1.5);
      color: var(--text-color);

      &:last-child {
        color: var(--text-grey);
      }
    }
  }

  &_button {
    @include defaultButton;
    align-self: flex-start;
    border-radius: 10px;
    color: var(--text-primary);
  }
}
</style>