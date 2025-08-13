import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { verificationService } from '../services'

const useVerificationMutation = () => {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success('Подтверждение прошло успешно!')

			router.push('/dashboard/settings')
		},
		onError() {
			router.push('/auth/login')
		}
	})

	return { verification }
}

export default useVerificationMutation
