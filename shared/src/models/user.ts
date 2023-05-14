import { z } from 'zod'

export const User = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: 'Имя обязательно',
    })
    .min(1, 'Имя должно содержать хотя бы 1 символ'),
  email: z
    .string({
      required_error: 'E-mail обязателен',
    })
    .email('E-mail должен быть действительным'),
})

export type User = z.infer<typeof User>
