import z from 'zod'

export const SettingSchema = z.object({
	name: z.string().min(2, {
		error: 'Введите имя.'
	}),
	email: z.email({
		error: 'Некорректный email.'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingSchema = z.infer<typeof SettingSchema>
