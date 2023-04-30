<script setup lang="ts">
  import { useUser } from '@sovok/client/composables/user'

  const { user, userError } = useUser()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-2">
    <p v-if="userError">{{ userError.message }}</p>
    <p v-else-if="!user">Loading...</p>
    <p v-else>{{ user.name }}</p>
  </div>
</template>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
