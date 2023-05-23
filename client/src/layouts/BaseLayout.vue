<script setup lang="ts">
  import { h, onErrorCaptured } from 'vue'
  import { NLayout, useNotification } from 'naive-ui'
  import BaseHeader from '@sovok/client/components/BaseHeader.vue'
  import { ZodIssue } from 'zod'
  import { exists } from '@sovok/shared'

  const notification = useNotification()

  const getZodError = (error: Error): ZodIssue[] | null => {
    try {
      const messages = JSON.parse(error.message)

      if (
        Array.isArray(messages) &&
        Array.isArray(messages.at(0)?.path) &&
        typeof messages.at(0)?.code === 'string'
      ) {
        return messages as unknown as ZodIssue[]
      }

      return null
    } catch {
      return null
    }
  }

  onErrorCaptured(error => {
    const zodError = getZodError(error)

    if (!exists(zodError)) {
      notification.warning({
        duration: 5_000,
        title: 'Непредвиденная ошибка',
        description: error.message,
      })
      return true
    }

    notification.error({
      duration: 12_000,
      title: 'Неверные данные',
      description: () =>
        h(
          'div',
          zodError.map(({ message }) => `${message}`).map(msg => h('p', msg)),
        ),
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
