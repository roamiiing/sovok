<script setup lang="ts">
  import { useAuthStore } from '@sovok/client/composables/auth'
  import { SignUpInput } from '@sovok/shared'
  import { NButton, NForm, NFormItem, NInput } from 'naive-ui'
  import { computed, ref } from 'vue'

  const signUpData = ref<SignUpInput>({
    email: '',
    name: '',
    password: '',
  })

  const passwordConfirmation = ref('')

  const passwordConfirmationValidation = computed(() => {
    const isValid = passwordConfirmation.value === signUpData.value.password

    if (!isValid)
      return {
        status: 'error' as const,
        message: 'Пароли должны совпадать',
      }

    return { status: 'success' as const }
  })

  const { signUp } = useAuthStore()

  const submitForm = async () => {
    await signUp(signUpData.value)
  }
</script>

<template>
  <NForm @submit.prevent="submitForm">
    <NFormItem label="E-mail" required>
      <NInput v-model:value="signUpData.email" placeholder="Введите e-mail" />
    </NFormItem>
    <NFormItem label="Имя" required>
      <NInput v-model:value="signUpData.name" placeholder="Введите имя" />
    </NFormItem>
    <NFormItem label="Пароль" required>
      <NInput
        v-model:value="signUpData.password"
        type="password"
        placeholder="Введите пароль"
      />
    </NFormItem>
    <NFormItem
      label="Подтверждение"
      required
      :validation-status="passwordConfirmationValidation.status"
    >
      <NInput
        v-model:value="passwordConfirmation"
        type="password"
        placeholder="Введите пароль еще раз"
      />
    </NFormItem>

    <NButton class="w-full" type="primary" attr-type="submit"> Войти </NButton>
  </NForm>
</template>
