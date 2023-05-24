import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import useSWRV from 'swrv'
import {
  SignInInput,
  SignInOutputType,
  SignUpInput,
  SignUpOutputType,
} from '@sovok/shared'
import { trpc } from '@sovok/client/trpc'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import { Page } from '../domain/page'

export const useAuthStore = defineStore('auth', () => {
  const token = useLocalStorage<string | null>('sovok-auth-token', () => null)

  const {
    data: user,
    error: userError,
    mutate: refetchUser,
  } = useSWRV('trpc.auth.me', () => trpc.auth.me.query(), {
    shouldRetryOnError: false,
  })

  const notification = useNotification()
  const router = useRouter()

  const signIn = async (input: SignInInput) => {
    const res = await trpc.auth.signIn.mutate(input)

    if (res.type === SignInOutputType.Success) {
      token.value = res.credentials.jwt
      refetchUser(() => res.credentials.user)
      router.replace({
        name: Page.DashboardHome,
      })
    } else {
      notification.error({
        duration: 5000,
        title: 'Неверные данные',
        description:
          'Проверьте правильность введенных данных и повторите попытку',
      })
    }

    return res
  }

  const signUp = async (input: SignUpInput) => {
    const res = await trpc.auth.signUp.mutate(input)

    if (res.type === SignUpOutputType.Success) {
      token.value = res.credentials.jwt
      refetchUser(() => res.credentials.user)
      router.replace({
        name: Page.DashboardHome,
      })
    } else {
      notification.error({
        duration: 5000,
        title: 'Пользователь уже существует',
        description: 'Введите другой e-mail и повторите попытку',
      })
    }

    return res
  }

  const logout = () => {
    token.value = null
    refetchUser()
  }

  return {
    token,
    user,
    userError,
    signIn,
    signUp,
    logout,
    refetchUser,
  }
})
