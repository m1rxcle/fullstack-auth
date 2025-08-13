import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString({ message: 'Имя должно быть строкой' })
	@IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
	name: string

	@IsString({ message: 'Email должен быть строкой' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязательно для заполнения.' })
	email: string

	@IsBoolean({ message: 'isTwoFactorEnabled должен быть boolean' })
	isTwoFactorEnabled: boolean
}
