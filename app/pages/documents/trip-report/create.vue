<template>
  <div class="page">
    <header class="page-header">
      <span class="page-header_eyebrow">Формування документів</span>
      <h1>Звіт про відрядження</h1>
    </header>

    <div class="layout">
      <main class="content">
        <div class="card">
          <h3>Кому адресовано</h3>
          <RecipientForm v-model="recipient" :errors="errors" />
        </div>

        <div class="card">
          <h3>Заявник</h3>
          <ApplicantForm v-model="applicant" :errors="errors" />
        </div>

        <div class="card">
          <h3>Відрядження</h3>
          <TripDetailsForm v-model="trip" :errors="errors" />
        </div>
      </main>

      <aside class="preview-rail">
        <LetterPreview
          :recipient="recipient"
          :applicant="applicant"
          :applicant-full-name="applicantFullName"
          :applicant-signature-line="applicantSignatureLine"
          :letter-body="letterBody"
        />

        <div class="card actions-card">
          <span v-if="saveError" class="error">{{ saveError }}</span>
          <button type="button" class="btn-save" :disabled="isSaving" @click="handleSave">
            {{ isSaving ? 'Збереження...' : 'Зберегти документ' }}
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTripReportForm } from '../../../composables/useTripReportForm'

import RecipientForm from '../../../components/trip-report/RecipientForm.vue'
import ApplicantForm from '../../../components/trip-report/ApplicantForm.vue'
import TripDetailsForm from '../../../components/trip-report/TripDetailsForm.vue'
import LetterPreview from '../../../components/trip-report/LetterPreview.vue'

const {
  recipient, applicant, trip,
  applicantFullName, applicantSignatureLine, letterBody,
  errors, isSaving, saveError,
  save,
} = useTripReportForm()

onMounted(async () => {
  // const user = useSupabaseUser()
  // if (user.value) {
  //   applicant.lastName = user.value.user_metadata.lastName
  // }
})

async function handleSave() {
  await save()
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
  grid-template-columns: 1fr 380px;
  align-items: start;
  gap: 24px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
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

.preview-rail {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.actions-card {
  gap: 10px;
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
  .layout { grid-template-columns: 1fr; }
  .preview-rail { position: static; }
}

@media screen and (max-width: 480px) {
  .page { padding: 24px 16px 60px; }
  .page-header h1 { font-size: 1.5rem; }
}
</style>