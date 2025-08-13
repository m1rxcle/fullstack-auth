import z from 'zod'

export const LoginSchema = z.object({
	email: z.email({
		error: 'Некорректный email.'
	}),
	password: z.string().min(6, {
		error: 'Пароль должен содержать не менее 6 символов.'
	}),
	code: z.optional(z.string())
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
