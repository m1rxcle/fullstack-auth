'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsGoogle } from 'react-icons/bs'
import { FaYandex } from 'react-icons/fa6'

import { Button } from '@/shared/components/ui'

import { authService } from '../services'

interface Props {
	className?: string
}

export const AuthSocial: React.FC<Props> = ({ className }) => {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth by provider'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}

	return (
		<>
			<div className='mb-4 flex items-center justify-center gap-6'>
				<div className='flex w-full items-center'>
					<Button
						onClick={() => onClick('google')}
						className='w-full'
						variant='outline'
					>
						<BsGoogle className='mr-2 size-4' />
						Google
					</Button>
				</div>
				<div className='flex w-full items-center'>
					<Button
						onClick={() => onClick('yandex')}
						className='w-full'
						variant='outline'
					>
						<FaYandex className='mr-2 size-4' />
						Яндекс
					</Button>
				</div>
			</div>

			<div className='relative mb-4'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='text-muted-foreground bg-background px-2'>
						ИЛИ
					</span>
				</div>
			</div>
		</>
	)
}
