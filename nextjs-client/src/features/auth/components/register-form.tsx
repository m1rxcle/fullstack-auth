'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components/ui'

import { useRegisterMutation } from '../hooks'
import { RegisterSchema, TypeRegisterSchema } from '../schemas'

import { AuthWrapper } from './auth-wrapper'
import { ShowPasswordButton } from './show-password-button'

export default function RegisterForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showRepeatedPassword, setShowRepeatedPassword] =
		useState<boolean>(false)

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { register, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		if (recaptchaValue) {
			register({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Подтвердите, что вы не робот.')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт ? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='name'>Ваше имя</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingRegister}
										id='name'
										type='text'
										placeholder='alan'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='email'>
									Ваша почта
								</FormLabel>
								<FormControl>
									<Input
										disabled={isLoadingRegister}
										id='email'
										type='email'
										placeholder='alan.turing@gmail.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='password'>
									Ваш пароль
								</FormLabel>
								<FormControl>
									<div className='relative flex items-center'>
										<Input
											disabled={isLoadingRegister}
											id='password'
											type={
												showPassword
													? 'text'
													: 'password'
											}
											placeholder='******'
											{...field}
										/>
										<ShowPasswordButton
											showPassword={showPassword}
											setShowPassword={setShowPassword}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='passwordRepeat'>
									Повторите ваш пароль
								</FormLabel>
								<FormControl>
									<div className='relative flex items-center'>
										<Input
											disabled={isLoadingRegister}
											id='passwordRepeat'
											type={
												showRepeatedPassword
													? 'text'
													: 'password'
											}
											placeholder='******'
											{...field}
										/>
										<ShowPasswordButton
											showPassword={showRepeatedPassword}
											setShowPassword={
												setShowRepeatedPassword
											}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptchaValue}
							theme={theme === 'dark' ? 'dark' : 'light'}
						/>
					</div>

					<Button
						disabled={isLoadingRegister}
						className='mt-2'
						type='submit'
					>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
