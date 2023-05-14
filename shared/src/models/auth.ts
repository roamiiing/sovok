import { z } from 'zod'
import { User } from './user'

export const Password = z
  .string({
    required_error: 'Пароль обязателен',
  })
  .min(5, 'Пароль должен содержать минимум 5 символов')
  .max(100, 'Пароль должен содержать максимум 100 символов')
export type Password = z.infer<typeof Password>

export const Credentials = z.object({
  jwt: z.string(),
  user: User,
})

export type Credentials = z.infer<typeof Credentials>

export const SignUpInput = z.object({
  name: User.shape.name,
  email: User.shape.email,
  password: Password,
})

export type SignUpInput = z.infer<typeof SignUpInput>

export enum SignUpOutputType {
  Success = 'success',
  AlreadyExists = 'already-exists',
}

export const SignUpOutput = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(SignUpOutputType.Success),
    credentials: Credentials,
  }),
  z.object({
    type: z.literal(SignUpOutputType.AlreadyExists),
  }),
])

export type SignUpOutput = z.infer<typeof SignUpOutput>

export const SignInInput = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInInput = z.infer<typeof SignInInput>

export enum SignInOutputType {
  Success = 'success',
  InvalidCredentials = 'invalid-credentials',
}

export const SignInOutput = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(SignInOutputType.Success),
    credentials: Credentials,
  }),
  z.object({
    type: z.literal(SignInOutputType.InvalidCredentials),
  }),
])
