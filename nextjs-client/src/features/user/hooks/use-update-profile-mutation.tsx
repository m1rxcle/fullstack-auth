import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeSettingSchema } from '../schemas'
import { userService } from '../services'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeSettingSchema) =>
			userService.updateProfile(data),
		onSuccess() {
			toast.success('Профиль успешно обновлен')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
