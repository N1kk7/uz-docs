<template>

    <div class="main_modal">

        <div class="main_modal_head">
            <button @click="modalStore.closeModal()">
                X
            </button>
        </div>

        <div class="main_modal_content">
            ZVIT PRO VIDRYADZHENYA
        </div>

    </div>
</template>

<script setup>

import { useModalStore } from '../../../store/modal';

const modalStore = useModalStore();

//--REFS--//

const bossName = ref("");
const bossLastName = ref("");
const employeePosition = ref("");
const employeeName = ref("");
const employeeLastName = ref("");
const employeeId = ref(null);

const documentDate = ref("");
const documentId = ref(null);

const businessTripStartDate = ref("");
const businessTripEndDate = ref("");
const businessTripCity = ref("");
const businessTripCampaign = ref("");

const generatedDocument = ref(null);










</script>


<style lang="scss" scoped>

.main_modal {
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    background: var(--dark-bg);
    color: white;
    pointer-events: auto;
    &_head {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20px;
        cursor: pointer;

        button {
            background: black;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.25);
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            aspect-ratio: 1/1;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }
}

</style>