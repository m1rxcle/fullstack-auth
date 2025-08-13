import z from 'zod'

export const RegisterSchema = z
	.object({
		name: z.string().min(2, {
			error: 'Введите имя.'
		}),
		email: z.email({
			error: 'Некорректный email.'
		}),
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

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>
