<script setup lang="ts">
  import BaseTypography from '@sovok/client/components/BaseTypography.vue'
  import SignUpForm from '@sovok/client/components/auth/SignUpForm.vue'
  import { Page } from '@sovok/client/domain/page'
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <BaseTypography class="text-center">
      <h1>Регистрация</h1>
    </BaseTypography>

    <SignUpForm />

    <BaseTypography class="text-center mt-5">
      <RouterLink
        :to="{
          name: Page.SignIn,
        }"
        >У меня есть аккаунт</RouterLink
      >
    </BaseTypography>
  </div>
</template>
