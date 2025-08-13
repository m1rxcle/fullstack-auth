import z from 'zod'

export const ResetPasswordSchema = z.object({
	email: z.email({
		error: 'Некорректный email.'
	})
})

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
