import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	Validate
} from 'class-validator'

import { IsPasswordsMatchingConstraint } from '@/libs/decorators/is-password-matching.decorators'

export class RegisterDto {
	@IsString({ message: 'Имя должно быть строкой' })
	@MinLength(2, { message: 'Имя должно быть не менее 2 символов' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
	name: string

	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	@MinLength(4, { message: 'Email должен быть не менее 2 символов' })
	@IsNotEmpty({ message: 'Email обязательно для заполнения.' })
	email: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязательно для заполнения.' })
	@MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
	password: string

	@IsString({ message: 'Пароль подтверждения должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль подтверждения обязательно для заполнения.' })
	@MinLength(6, {
		message: 'Пароль подтверждения должен быть не менее 6 символов'
	})
	@Validate(IsPasswordsMatchingConstraint, { message: 'Пароли не совпадают' })
	passwordRepeat: string
}
