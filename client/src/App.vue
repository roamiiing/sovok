<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { NConfigProvider, NNotificationProvider } from 'naive-ui'

  import { useThemeStore } from '@sovok/client/composables/ui'
  import BaseLayout from '@sovok/client/layouts/BaseLayout.vue'

  const route = useRoute()

  const layout = computed(() => route.meta.layout ?? BaseLayout)

  const { currentThemeOverrides, currentTheme } = useThemeStore()
</script>

<template>
  <NConfigProvider
    class="w-full h-full"
    :theme="currentTheme"
    :theme-overrides="currentThemeOverrides"
  >
    <NNotificationProvider>
      <component :is="layout">
        <RouterView />
      </component>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<style>
  @import './styles/preflight.css';
  /* @tailwind base; */
  @tailwind components;
  @tailwind utilities;
</style>
