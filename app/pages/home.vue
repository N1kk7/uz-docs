<template>
  <div class="home">
    <div class="home_head">
      <h1>Головна</h1>
      <img class="uz_logo_image" :src="LOGO" />
    </div>

    <div class="notification">
      <div class="notification_message">
        <p>
          Якщо ви вже працювали в системі або раніше створювали документи,
          рекомендуємо скористатися функцією вибору працівника.
        </p>

        <p>
          Це дозволить автоматично підставляти збережені дані та значно
          скоротить час на заповнення форм, забезпечуючи більш зручну та
          ефективну роботу з додатком.
        </p>
      </div>

      <button class="notification_button">Знайти працівника</button>
    </div>

    <div class="home_content">

        <h3>
            Доступні функції:
        </h3>

        <ul class="features_wrapper">
            <li>
                <img :src="DOCUMENT" alt="document" />
                <p>
                    Створення та редагування документів
                </p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import LOGO from "@/public/logo-white1.png";
import DOCUMENT from "@/public/document.png";
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  gap: 30px;

  &_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    position: relative;
    background: var(--main-accent);
    width: 100%;
    height: auto;

    h1 {
      color: var(--active-btn);
      font-size: 1.8rem;
      font-weight: 600;
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
  }


}

.notification {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    position: relative;
    background: black;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 20px;
    color: var(--text-color);
    width: 90vw;

    &_message {
        width: 100%;
        height: auto;
        background: var(--light-bg);
        padding: 15px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 10px;
        font-size: 1rem;
    }

    &_button {
        background: var(--accent-button);
        color: var(--active-btn);
        border: none;
        padding: 10px 50px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: all ease 0.3s;


        @media screen and (min-width: 1024px) {
            &:hover {
                background: var(--hover-btn);
                transition: all ease 0.3s;
            }
        }
    }
}

.home_content {
    display: block;
    width: 97vw;
    height: -webkit-fill-available;
    position: relative;

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: var(--text-color);
        margin-left: 20px;
    }

    .features_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: black;
        width: 100%;
        height: 90%;
        overflow-y: auto;
        padding: 20px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        gap: 15px;

        li {
            font-size: 1.2rem;
            font-weight: 500;
            color: var(--text-color);
            width: 100%;
            height: auto;
            background: var(--light-bg);
            padding: 25px 15px;
            border-radius: 15px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            transition: all ease 0.3s;
            cursor: pointer;
            gap: 15px;

            img {
                width: 40px;
                height: 40px;
                object-fit: contain;
            }

            @media screen and (min-width: 1024px) {
                &:hover {
                    background: var(--light-bg-hover);
                    transition: all ease 0.3s;
                }
            }
        }
    }
}
</style>
