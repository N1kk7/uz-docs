<template>
  <div class="page">
    <header class="page-header">
      <div class="page-header_text">
        <span class="page-header_eyebrow">Особистий кабінет</span>
        <h1>Документи</h1>
      </div>
      <img class="page-header_logo" :src="LOGO" alt="УЗ" />
    </header>









    

    <!-- <div class="notification">
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
    </div> -->

    <div class="wrap">
      <nav class="breadcrumbs">
        <NuxtLink to="/home">Головна</NuxtLink>
        <span class="breadcrumbs_sep">/</span>
        <span class="breadcrumbs_current">Документи</span>
      </nav>




      <section class="content">
        <h3>Формування документів</h3>

        <ul class="tiles">
          <li>
            <NuxtLink to="/documents/avansoviy-zvit" class="tile">
              <span class="tile_icon">
                <img :src="DOCUMENT" alt="" />
              </span>
              <span class="tile_text">
                <span class="tile_title">Авансовий звіт</span>
                <span class="tile_subtitle">Заповнити та сформувати документ</span>
              </span>
              <span class="tile_arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/documents/trip-report/create" class="tile">
              <span class="tile_icon">
                <img :src="DOCUMENT" alt="" />
              </span>
              <span class="tile_text">
                <span class="tile_title">Звіт про відрядження</span>
                <span class="tile_subtitle">Заповнити та сформувати документ</span>
              </span>
              <span class="tile_arrow" aria-hidden="true">→</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import LOGO from "@/public/logo-white1.png";
import DOCUMENT from "@/public/document.png";

// import { useModalStore } from "../../store/modal";
// const modalStore = useModalStore();
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--dark-bg);
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 32px;
  background: var(--main-accent);
  border-bottom: 2px solid var(--brass);

  &_text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &_eyebrow {
    @include text(0.8rem, 1.2, 500);
    color: var(--brass);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h1 {
    @include textDisplay(1.75rem, 1.2, 700);
    color: var(--active-btn);
    margin: 0;
  }

  &_logo {
    width: 52px;
    height: 52px;
    object-fit: contain;
    flex: none;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 24px 60px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  @include text(0.9rem, 1.2, 500);

  a {
    color: var(--text-grey);
    transition: color ease 0.2s;

    &:hover { color: var(--accent-button); }
  }

  &_sep { color: var(--text-grey); opacity: 0.5; }
  &_current { color: var(--text-color); }
}

.content {
  h3 {
    @include textDisplay(1.15rem, 1.3, 600);
    color: var(--text-color);
    margin: 0 0 16px;
  }
}

.tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;

  li { width: 100%; }
}

.tile {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 20px;
  background: var(--panel-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  cursor: pointer;
  transition: border-color ease 0.2s, transform ease 0.2s, background ease 0.2s;

  &_icon {
    flex: none;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--input-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 12px;

    img {
      width: 26px;
      height: 26px;
      object-fit: contain;
    }
  }

  &_text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  &_title {
    @include text(1rem, 1.3, 600);
    color: var(--text-color);
  }

  &_subtitle {
    @include text(0.8rem, 1.3, 400);
    color: var(--text-grey);
  }

  &_arrow {
    margin-left: auto;
    flex: none;
    @include text(1.1rem, 1, 400);
    color: var(--text-grey);
    transition: transform ease 0.2s, color ease 0.2s;
  }

  @media screen and (min-width: 1024px) {
    &:hover {
      border-color: var(--brass);
      background: var(--light-bg);
      transform: translateY(-2px);

      .tile_arrow {
        color: var(--brass);
        transform: translateX(3px);
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .page-header {
    padding: 20px;

    h1 { font-size: 1.4rem; }

    &_logo { width: 40px; height: 40px; }
  }

  .tile {
    padding: 16px;
  }
}
</style>