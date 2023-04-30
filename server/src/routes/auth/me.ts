import { protectedProcedure } from '@sovok/server/trpc'
import { User } from '@sovok/shared'

export const me = protectedProcedure //
  .output(User)
  .query(({ ctx }) => {
    return ctx.user
  })
