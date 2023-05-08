<script setup lang="ts">
  import BaseTypography from '@sovok/client/components/BaseTypography.vue'
  import SignInForm from '@sovok/client/components/auth/SignInForm.vue'
</script>

<template>
  <div class="w-full max-w-sm mx-auto">
    <BaseTypography class="text-center">
      <h1>Вход</h1>
    </BaseTypography>

    <SignInForm />
  </div>
</template>
