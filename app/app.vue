<template>
  <NuxtLayout>
    <NuxtPage />
    <!-- <Analytics /> -->
  </NuxtLayout>
</template>


<script setup>

import { onMounted } from 'vue'
// import { Analytics } from "@vercel/analytics/nuxt";





onMounted(async () => {
  await import('@/assets/style/main.scss')
})

</script>
