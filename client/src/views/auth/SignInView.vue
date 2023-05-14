<script setup lang="ts">
  import BaseTypography from '@sovok/client/components/BaseTypography.vue'
  import SignInForm from '@sovok/client/components/auth/SignInForm.vue'
  import { Page } from '@sovok/client/domain/page'
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <BaseTypography class="text-center">
      <h1>Вход</h1>
    </BaseTypography>

    <SignInForm />

    <BaseTypography class="text-center mt-5">
      <RouterLink
        :to="{
          name: Page.SignUp,
        }"
        >У меня нет аккаунта</RouterLink
      >
    </BaseTypography>
  </div>
</template>
