<template>
  <div class="page_wrapper">
    <AppHeader/>

    <div class="page">
    <div class="tabs">
      <button
        type="button"
        class="tabs_btn"
        :class="{ active: step === 'front' }"
        @click="step = 'front'"
      >
        Лицьова сторона
      </button>
      <button
        type="button"
        class="tabs_btn"
        :class="{ active: step === 'back' }"
        @click="step = 'back'"
      >
        Зворотна сторона
      </button>
    </div>

    <section v-show="step === 'front'" class="side">
      <div class="card">
        <h3>Дані особи</h3>
        <PersonInfoForm v-model="person" :errors="errors" />
      </div>

      <div class="card">
        <ReceivedList
          :items="received"
          :total="totalReceived"
          :on-add="addReceivedItem"
          :on-remove="removeReceivedItem"
        />
      </div>

      <div class="card">
        <SummaryPanel
          :total-received="totalReceived"
          :total-spent="totalSpent"
          :balance="balance"
          :overspent="overspent"
          :amount-in-words="amountInWords"
        />
      </div>
    </section>

    <section v-show="step === 'back'" class="side">
      <div class="card">
        <ExpenseList
          :items="expenses"
          :total="totalSpent"
          :errors="errors"
          :on-add="addExpense"
          :on-remove="removeExpense"
        />
      </div>
    </section>

    <div class="actions">
      <span v-if="saveError" class="error">{{ saveError }}</span>
      <button type="button" class="actions_save" :disabled="isSaving" @click="handleSave">
        {{ isSaving ? 'Збереження...' : 'Зберегти документ' }}
      </button>
    </div>
  </div>


  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdvanceReportForm } from '../../composables/useAdvanceReportForm'
import AppHeader from '../../components/AppHeader.vue';

import PersonInfoForm from '../../components/advance-report/PersonInfoForm.vue'
import ReceivedList from '../../components/advance-report/ReceivedList.vue'
import ExpenseList from '../../components/advance-report/ExpenseList.vue'
import SummaryPanel from '../../components/advance-report/SummaryPanel.vue'

const {
  person, received, expenses,
  totalReceived, totalSpent, balance, overspent, amountInWords,
  errors, isSaving, saveError,
  addReceivedItem, removeReceivedItem, addExpense, removeExpense,
  save,
} = useAdvanceReportForm()

const step = ref('front')

onMounted(async () => {
  // const user = useSupabaseUser()
  // if (user.value) {
  //   // подтянуть ФІО/таб.номер/ІПН из профиля пользователя
  //   // person.lastName = user.value.user_metadata.lastName
  //   // ...
  // }
})

async function handleSave() {
  const ok = await save()
  if (ok) {
    step.value = 'front'
    // navigateTo(...) или показать тост
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 8px;
  background: var(--dark-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  border-radius: 15px;
  padding: 6px;
  width: fit-content;

  &_btn {
    @include text(0.95rem, 1.3, 500);
    padding: 10px 20px;
    background: transparent;
    color: var(--text-grey);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all ease 0.3s;

    &.active {
      background: var(--secondary-btn);
      color: var(--text-color);
    }

    &:hover:not(.active) {
      color: var(--text-color);
    }
  }
}

.side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: var(--dark-bg);
  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    @include text(1.1rem, 1.3, 700);
    color: var(--text-color);
    margin: 0;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;

  &_save {
    @include defaultButton;
    border-radius: 10px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
}

.error {
  @include text(0.875rem, 1.4, 400);
  color: #ff8a80;
}
</style>