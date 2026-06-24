<template>
  <section class="main_section">
    <div class="head_element">
      <h1>Корпоративний застосунок</h1>
      <div class="uz_logo">
        <!-- <div class="uz_logo_text">укрзалізниця</div> -->
        <img class="uz_logo_image" :src="LOGO" />
        <!-- <img class="uz_logo_image" src="/temp/temp.jpg"/> -->
      </div>
      
    </div>
    <div class="content_element">
      <div class="content_element_wrapper">

            <div class="text_block">
        <div class="welcome_message">
          <h2>Вітаємо в застосунку!</h2>
          <p>
            Цей застосунок створений для співробітників компанії, щоб
            забезпечити зручний доступ до важливої інформації, ресурсів та
            інструментів, необхідних для ефективної роботи.
          </p>
        </div>
        <div class="access_message">Для початку роботи увійдіть в систему.</div>
      </div>

      <input type="text" placeholder="Введіть код доступу" />

      <button
        @click="verifyAccessCode"
      >
        Вхід
      </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import App from "~/app.vue";
import LOGO from '@/public/logo-white1.png';



async function verifyAccessCode(code) {


  window.location.href = "/home";
}

useHead({
  title: "Home page — HR&B Constructions",
  meta: [
    {
      name: "HR&B Constructions",
      content: "HR&B page description",
    },
  ],
});
</script>

<style scoped lang="scss">
.main_section {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  background: var(--dark-bg);

  color: var(--active-btn);
}

.head_element {
  width: 100%;
  height: 25vh;
  position: relative;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background: var(--main-accent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
}

.uz_logo {
  display: flex;
  justify-content: center;
  align-items: center;
  // gap: 20px;

  &_text {
    font-size: 1.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  &_image {
    width: 70px;
    height: 70px;
    object-fit: contain;
    transform: translateY(-2px);
  }
}


.content_element {
  width: 100%;
  height: -webkit-fill-available;
  position: relative;
  padding: 30px 20px;


  &_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      background: var(--light-bg);
      border-radius: 20px;
      height: 100%;
      padding: 50px 30px;

      .text_block {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        max-width: 80%;
        margin-right: auto;
        gap: 20px;
      }

      .welcome_message {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        gap: 50px;
      }

      h2 {
        font-size: 1.8rem;
        font-weight: 600;
      }
      p {
        font-size: 1.2rem;
        font-weight: 500;
      }

      input {
        background: black;
        border: none;
        border-radius: 10px;
        padding: 25px 15px;
        color: var(--active-btn);
        width: 100%;
        font-size: 1.8rem;
      }

      input::placeholder {
        color: var(--text-grey);
        font-size: 1.3rem;
      }

      button {
        padding: 25px 15px;
        background: var(--accent-button);
        width: 100%;
        border-radius: 30px;
        height: auto;
        border: none;
        transform: translateY(-20%);
        transition: all ease 0.3s;
        font-size: 1.8rem;
        font-weight: 600;

        @media screen and (min-width: 1024px) {
          &:hover {
            background: var(--hover-btn);
            transition: all ease 0.3s;
            cursor: pointer;

          }
        }
      }
  }
}
</style>
