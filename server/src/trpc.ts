import { PrismaClient } from '@prisma/client'
import { User } from '@sovok/shared'
import { TRPCError, initTRPC } from '@trpc/server'

export type Context = {
  prisma: PrismaClient
  user: User | null
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

const isAuthorized = middleware(async opts => {
  const { ctx } = opts

  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ...opts,
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthorized)
