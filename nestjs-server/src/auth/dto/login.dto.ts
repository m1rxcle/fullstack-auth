import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class LoginDto {
	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязательно для заполнения.' })
	email: string

	@IsString({ message: 'Пароль должен быть строкой' })
	@IsNotEmpty({ message: 'Пароль обязательно для заполнения.' })
	@MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
	password: string

	@IsOptional()
	@IsString()
	code: string
}
