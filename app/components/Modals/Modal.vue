<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content max-h-[100vh] overflow-y-auto">
      <slot :openModal="openModal" :closeModal="closeModal" />
      <component
        v-if="currentModal"
        :is="modalComponents[currentModal]"
        v-bind="modalProps"
        :openModal="openModal"
        :closeModal="closeModal"
      />
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'
import { useModalStore } from '@/store/modal';

import AvansoviyZvit from "../../components/Modals/AvansoviyZvit.vue";
import ZvitVidryadzheniya from "../../components/Modals/ZvitVidryadzheniya.vue";



const modalStore = useModalStore();
const isVisible = computed(() => modalStore.isVisible);
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const closeModal = () => {
  modalStore.closeModal();
};
const openModal = (modalName, props = {}) => {
  modalStore.showModal(modalName, props);
};














const modalComponents = {
    //components
//   DeleteSubscriptionPlan,
  AvansoviyZvit,
  ZvitVidryadzheniya
}

</script>



<style lang="scss">


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
}
.modal-content {
  background: transparent;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    & {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      background: transparent;
    }
  }
}
</style>