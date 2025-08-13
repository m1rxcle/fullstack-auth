'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading,
	Switch
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import { useUpdateProfileMutation } from '../hooks/use-update-profile-mutation'
import { SettingSchema, TypeSettingSchema } from '../schemas'

import UserButton from './user-button'
import UserButtonLoading from './user-button-skeleton'

export default function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingSchema>({
		resolver: zodResolver(SettingSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = async (values: TypeSettingSchema) => {
		update(values)
	}

	if (!user) return null

	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Настройки профиля</CardTitle>
				{isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loading />
				) : (
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
										<FormLabel htmlFor='name'>
											Ваше имя
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoadingUpdate}
												id='name'
												type='text'
												placeholder={
													user.displayName || ''
												}
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
												disabled={isLoadingUpdate}
												id='email'
												type='email'
												placeholder={user.email || ''}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isTwoFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-2'>
											<FormLabel>
												Двухфакторная аутентификация
											</FormLabel>
											<FormDescription>
												Включите двухфакторную
												аутентификацию для вашей учетной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												disabled={isLoadingUpdate}
												className='cursor-pointer'
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								disabled={isLoadingUpdate}
								className='mt-2'
								type='submit'
							>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
