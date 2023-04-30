import { router } from '@sovok/server/trpc'

import { auth } from './auth'

export const mainRouter = router({
  auth,
})
