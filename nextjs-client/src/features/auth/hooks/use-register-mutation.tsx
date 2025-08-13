import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../schemas'
import { authService } from '../services'

export function useRegisterMutation() {
	const router = useRouter()
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterSchema
			recaptcha?: string
		}) => authService.register(values, recaptcha),
		onSuccess(data: any) {
			toastMessageHandler(data)

			router.push('/auth/login')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { register, isLoadingRegister }
}
