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

import { useNewPasswordMutation } from '../hooks/use-new-password-mutation'
import {
	NewPasswordSchema,
	TypeNewPasswordSchema
} from '../schemas/new-password.schema'

import { AuthWrapper } from './auth-wrapper'
import { ShowPasswordButton } from './show-password-button'

export default function NewPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showRepeatedPassword, setShowRepeatedPassword] =
		useState<boolean>(false)

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: ''
		}
	})

	const { newPassword, isLoadingNew } = useNewPasswordMutation()

	const onSubmit = (values: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			newPassword({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Подтвердите, что вы не робот.')
		}
	}

	return (
		<AuthWrapper
			heading='Новый пароль'
			description='Придумайте новый пароль для вашего аккаунта.'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
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
											disabled={isLoadingNew}
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
											disabled={isLoadingNew}
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
						disabled={isLoadingNew}
						className='mt-2'
						type='submit'
					>
						Сохранить пароль
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
