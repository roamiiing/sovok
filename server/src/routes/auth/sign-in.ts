import { publicProcedure } from '@sovok/server/trpc'
import { SignInInput, SignInOutput, SignInOutputType } from '@sovok/shared'
import { verify } from 'argon2'
import { sign } from 'jsonwebtoken'

const verifyPassword = async (hash: string, password: string) => {
  return verify(hash, password)
}

const signToken = (userId: string) => {
  return sign({ userId }, process.env.SOVOK_SERVER_JWT_SECRET!)
}

export const signIn = publicProcedure
  .input(SignInInput)
  .output(SignInOutput)
  .mutation(async ({ ctx: { prisma }, input }) => {
    const user = await prisma.user.findUnique({
      select: { id: true, name: true, email: true, password: true },
      where: { email: input.email },
    })

    if (!user) return { type: SignInOutputType.InvalidCredentials }

    const isPasswordValid = await verifyPassword(user.password, input.password)

    if (!isPasswordValid) return { type: SignInOutputType.InvalidCredentials }

    return {
      type: SignInOutputType.Success,
      credentials: {
        jwt: signToken(user.id),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    }
  })
