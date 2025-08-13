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

import { useResetPasswordMutation } from '../hooks'
import { ResetPasswordSchema, TypeResetPasswordSchema } from '../schemas'

import { AuthWrapper } from './auth-wrapper'

export default function ResetPasswordForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { reset, isLoadingReset } = useResetPasswordMutation()

	const onSubmit = (values: TypeResetPasswordSchema) => {
		if (recaptchaValue) {
			reset({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Подтвердите, что вы не робот.')
		}
	}

	return (
		<AuthWrapper
			heading='Сброс пароля'
			description='Для сброса пароля введите свою почту'
			backButtonLabel='Нет аккаунта ? Регистрация'
			backButtonHref='/auth/register'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
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
										disabled={isLoadingReset}
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
						disabled={isLoadingReset}
						className='mt-2'
						type='submit'
					>
						Сбросить пароль
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
