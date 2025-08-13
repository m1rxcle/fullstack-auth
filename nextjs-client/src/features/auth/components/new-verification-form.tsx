'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { Loading } from '@/shared/components/ui'

import useVerificationMutation from '../hooks/use-verification-mutation'

import { AuthWrapper } from './auth-wrapper'

const NewVerificationForm = () => {
	const search = useSearchParams()
	const token = search.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		verification(token)
	}, [])

	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}

export default NewVerificationForm
