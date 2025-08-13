import z from 'zod'

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6, {
			error: 'Пароль должен содержать не менее 6 символов.'
		}),
		passwordRepeat: z.string().min(6, {
			error: 'Пароль подтверждения должен содержать не менее 6 символов.'
		})
	})
	.refine(data => data.password === data.passwordRepeat, {
		error: 'Пароли не совпадают.',
		path: ['passwordRepeat']
	})

export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>
