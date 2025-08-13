'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import Link from 'next/link'
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

import { useLoginMutation } from '../hooks'
import { LoginSchema, TypeLoginSchema } from '../schemas'

import { AuthWrapper } from './auth-wrapper'
import { ShowPasswordButton } from './show-password-button'

export default function LoginForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { login, isLoadingLogin } = useLoginMutation(setIsShowTwoFactor)

	const onSubmit = (values: TypeLoginSchema) => {
		if (recaptchaValue) {
			login({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Подтвердите, что вы не робот.')
		}
	}

	return (
		<AuthWrapper
			heading='Вход в аккаунт'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Нет аккаунта ? Регистрация'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					{isShowTwoFactor && (
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor='code'>Код</FormLabel>
									<FormControl>
										<Input
											disabled={isLoadingLogin}
											id='code'
											type='text'
											placeholder='123456'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
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
												disabled={isLoadingLogin}
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
										<div className='flex items-center justify-between'>
											<FormLabel>Пароль</FormLabel>
											<Link
												href='/auth/reset-password'
												className='ml-auto inline-block text-sm text-gray-400 underline hover:text-gray-700'
											>
												Забыли пароль?
											</Link>
										</div>

										<FormControl>
											<div className='relative flex items-center'>
												<Input
													disabled={isLoadingLogin}
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
													setShowPassword={
														setShowPassword
													}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}

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
						disabled={isLoadingLogin}
						className='mt-2'
						type='submit'
					>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
