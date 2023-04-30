import { User } from '@sovok/shared'
import { router, publicProcedure } from './trpc'

export const me = publicProcedure.output(User).query(() => {
  return {
    id: '1',
    name: 'John Doe',
    email: 'aboba@gmail.com',
  }
})

export const mainRouter = router({
  me,
})
