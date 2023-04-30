import { router } from '@sovok/server/trpc'
import { signUp } from './sign-up'
import { signIn } from './sign-in'
import { me } from './me'

export const auth = router({
  signUp,
  signIn,
  me,
})
