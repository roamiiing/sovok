<script setup lang="ts">
  import { onErrorCaptured } from 'vue'
  import { NLayout, useNotification } from 'naive-ui'
  import BaseHeader from '@sovok/client/components/BaseHeader.vue'

  const notification = useNotification()

  onErrorCaptured(error => {
    notification.warning({
      duration: 5000,
      title: 'Непредвиденная ошибка',
      description: error.message,
    })
  })
</script>

<template>
  <NLayout class="w-full h-full">
    <BaseHeader class="sticky top-0 left-0 right-0 z-10" />

    <main class="container mx-auto px-4 pb-6 pt-16">
      <slot />
    </main>
  </NLayout>
</template>
