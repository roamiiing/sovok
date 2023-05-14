import { publicProcedure } from '@sovok/server/trpc'
import { signToken } from '@sovok/server/utils/jwt'
import { isUniqueConstraintError } from '@sovok/server/utils/prisma'
import { SignUpInput, SignUpOutput, SignUpOutputType } from '@sovok/shared'
import { hash } from 'argon2'
import { nanoid } from 'nanoid'

const generateUserId = () => nanoid(15)

const hashPassword = async (password: string) => {
  return hash(password)
}

export const signUp = publicProcedure
  .input(SignUpInput)
  .output(SignUpOutput)
  .mutation(async ({ ctx: { prisma }, input }) => {
    try {
      const user = await prisma.user.create({
        select: {
          id: true,
          name: true,
          email: true,
        },
        data: {
          id: generateUserId(),
          name: input.name,
          email: input.email,
          password: await hashPassword(input.password),
        },
      })

      return {
        type: SignUpOutputType.Success,
        credentials: {
          jwt: signToken(user.id),
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
      }
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        return {
          type: SignUpOutputType.AlreadyExists,
        }
      }

      throw error
    }
  })
