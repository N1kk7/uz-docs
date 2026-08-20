<template>
  <div class="digit-boxes" :class="{ 'has-error': hasError }">
    <input
      v-for="(_, i) in length"
      :key="i"
      ref="cells"
      class="digit-boxes_cell"
      type="text"
      inputmode="numeric"
      autocomplete="off"
      maxlength="1"
      :value="digits[i]"
      @input="onInput(i, $event)"
      @keydown="onKeydown(i, $event)"
      @paste="onPaste(i, $event)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  length: { type: Number, default: 10 },
  hasError: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const cells = ref([])

const digits = computed(() => {
  const padded = props.modelValue.padEnd(props.length, ' ')
  return padded.slice(0, props.length).split('').map((c) => (c === ' ' ? '' : c))
})

function setDigit(index, value) {
  const arr = props.modelValue.padEnd(props.length, ' ').split('')
  arr[index] = value || ' '
  emit('update:modelValue', arr.join('').replace(/\s+$/, ''))
}

function onInput(index, event) {
  const value = event.target.value.replace(/[^\d]/g, '').slice(-1)
  setDigit(index, value)
  event.target.value = value
  if (value && index < props.length - 1) {
    cells.value[index + 1]?.focus()
  }
}

function onKeydown(index, event) {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    cells.value[index - 1]?.focus()
  } else if (event.key === 'ArrowLeft' && index > 0) {
    cells.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    cells.value[index + 1]?.focus()
  }
}

function onPaste(index, event) {
  event.preventDefault()
  const text = (event.clipboardData || window.clipboardData).getData('text').replace(/[^\d]/g, '')
  if (!text) return
  const arr = props.modelValue.padEnd(props.length, ' ').split('')
  for (let i = 0; i < text.length && index + i < props.length; i++) {
    arr[index + i] = text[i]
  }
  emit('update:modelValue', arr.join('').replace(/\s+$/, ''))
  cells.value[Math.min(index + text.length, props.length - 1)]?.focus()
}
</script>

<style lang="scss" scoped>
.digit-boxes {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  &_cell {
    @include textMono(1rem, 1.2, 600);
    width: 32px;
    height: 40px;
    text-align: center;
    background: var(--input-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    color: var(--text-color);
    transition: border-color ease 0.2s, box-shadow ease 0.2s;
    padding: 0;

    &:focus {
      outline: none;
      border-color: var(--brass);
      box-shadow: 0 0 0 3px var(--brass-dim);
    }
  }

  &.has-error &_cell {
    border-color: var(--error);
  }

  @media screen and (max-width: 480px) {
    &_cell {
      width: 26px;
      height: 36px;
    }
  }
}
</style>