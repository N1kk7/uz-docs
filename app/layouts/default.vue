<template>
  <div class="layout">
    <main>
      <slot />
    </main>
    <ModalsModal>
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :openModal="openModal"
          :closeModal="closeModal"
        />
      </template>
    </ModalsModal>
  </div>
</template>




<script setup>








import { useModalStore } from "@/store/modal";
// import AppFooter from "~/components/AppFooter.vue";
// import AppHeader from "~/components/AppHeader.vue";
const modalStore = useModalStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color);
  overflow: hidden;
}
main {
  flex: 1;
  z-index: 1;
  overflow: hidden;
}
</style>
