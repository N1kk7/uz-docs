<template>
  <div class="page">
    <header class="page-header">
      <span class="page-header_eyebrow">Звіт про використання коштів</span>
      <h1>Авансовий звіт</h1>
    </header>

    <div class="layout">
      <nav class="rail">
        <button
          type="button"
          class="rail_item"
          :class="{ active: step === 'front' }"
          @click="step = 'front'"
        >
          <span class="rail_num">01</span>
          <span class="rail_label">Лицьова сторона</span>
        </button>
        <button
          type="button"
          class="rail_item"
          :class="{ active: step === 'back' }"
          @click="step = 'back'"
        >
          <span class="rail_num">02</span>
          <span class="rail_label">Зворотна сторона</span>
        </button>
      </nav>

      <main class="content">
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
      </main>



      

      <aside class="summary-rail">
        <div class="card summary-card">
          <SummaryPanel
            :total-received="totalReceived"
            :total-spent="totalSpent"
            :balance="balance"
            :overspent="overspent"
            :amount-in-words="amountInWords"
          />

          <div class="summary-card_actions">
            <span v-if="saveError" class="error">{{ saveError }}</span>
            <button type="button" class="btn-save" :disabled="isSaving" @click="handleSave">
              {{ isSaving ? 'Збереження...' : 'Зберегти документ' }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdvanceReportForm } from '../../composables/useAdvanceReportForm'

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
  //   person.lastName = user.value.user_metadata.lastName
  // }
})

async function handleSave() {
  const ok = await save()
  if (ok) {
    step.value = 'front'
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 32px 24px 80px;
  max-width: 1160px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &_eyebrow {
    @include text(0.8rem, 1.2, 500);
    color: var(--brass);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h1 {
    @include textDisplay(2rem, 1.2, 700);
    color: var(--text-color);
    margin: 0;
  }
}

.layout {
  display: grid;
  grid-template-columns: 200px 1fr 320px;
  align-items: start;
  gap: 24px;
}

.rail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 24px;

  &_item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    text-align: left;
    cursor: pointer;
    padding: 14px 16px;
    background: var(--panel-bg);
    border: 1px solid var(--border-subtle);
    border-left: 3px solid transparent;
    border-radius: 10px;
    transition: all ease 0.2s;

    &:hover {
      border-color: var(--border-subtle-hover);
    }

    &.active {
      border-left-color: var(--brass);
      background: var(--light-bg);
    }
  }

  &_num {
    @include textMono(0.75rem, 1, 600);
    color: var(--brass);
  }

  &_label {
    @include text(0.9rem, 1.3, 500);
    color: var(--text-color);
  }
}

.content {
  min-width: 0;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: var(--panel-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  h3 {
    @include textDisplay(1.05rem, 1.3, 600);
    color: var(--text-color);
    margin: 0;
  }
}

.summary-rail {
  position: sticky;
  top: 24px;
}

.summary-card {
  gap: 20px;

  &_actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.btn-save {
  @include text(0.95rem, 1.3, 500);
  width: 100%;
  padding: 13px 20px;
  background: var(--main-accent);
  color: var(--text-color);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  cursor: pointer;
  transition: all ease 0.2s;

  &:hover:not(:disabled) { background: var(--hover-btn); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.error {
  @include text(0.8rem, 1.3, 400);
  color: var(--error);
}

@media screen and (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .rail {
    flex-direction: row;
    position: static;
    overflow-x: auto;

    &_item {
      flex: 1;
      border-left: none;
      border-bottom: 3px solid transparent;

      &.active {
        border-bottom-color: var(--brass);
      }
    }
  }

  .summary-rail {
    position: static;
  }
}

@media screen and (max-width: 480px) {
  .page { padding: 24px 16px 60px; }
  .page-header h1 { font-size: 1.5rem; }
}
</style>