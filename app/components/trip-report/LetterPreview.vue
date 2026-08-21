<template>
  <div class="preview">
    <div class="preview_label">
      <span>Попередній перегляд</span>
      <span class="preview_hint">так виглядатиме документ при друку</span>
    </div>

    <div class="paper">
      <div class="paper_recipient">
        <p>{{ recipient.position || '—' }}</p>
        <p>«{{ recipient.department || '—' }}»</p>
        <p>{{ recipient.headName || '—' }}</p>
        <p>{{ applicant.position || '—' }}</p>
        <p>{{ applicantFullName || '—' }}</p>
        <p>Таб № {{ applicant.tabNumber || '—' }}</p>
      </div>

      <h2 class="paper_title">Звіт про відрядження</h2>

      <p class="paper_body">{{ letterBody }}</p>

      <div class="paper_signature">
        <span class="paper_signature_role">{{ applicant.position || '—' }}</span>
        <span class="paper_signature_line"></span>
        <span class="paper_signature_name">{{ applicantSignatureLine || '—' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipient: { type: Object, required: true },
  applicant: { type: Object, required: true },
  applicantFullName: { type: String, default: '' },
  applicantSignatureLine: { type: String, default: '' },
  letterBody: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.preview_label {
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    @include textDisplay(0.95rem, 1.3, 600);
    color: var(--text-color);
  }
}

.preview_hint {
  @include text(0.75rem, 1.2, 400);
  color: var(--text-grey);
}

.paper {
  background: #fbfaf7;
  color: #1a1a1a;
  border-radius: 4px;
  padding: 40px 36px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  font-family: 'PT Serif', Georgia, serif;
  display: flex;
  flex-direction: column;
  min-height: 420px;

  &_recipient {
    align-self: flex-end;
    text-align: left;
    width: 62%;

    p {
      margin: 0 0 4px;
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }

  &_title {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 40px 0 24px;
  }

  &_body {
    font-size: 0.85rem;
    line-height: 1.7;
    text-align: justify;
    text-indent: 32px;
    margin: 0;
    white-space: pre-wrap;
  }

  &_signature {
    margin-top: auto;
    padding-top: 48px;
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-size: 0.8rem;

    &_role { flex: none; }

    &_line {
      flex: 1;
      border-bottom: 1px solid #1a1a1a;
      margin: 0 4px;
    }

    &_name { flex: none; font-weight: 700; }
  }
}

@media screen and (max-width: 1024px) {
  .paper { padding: 28px 22px; }
}
</style>