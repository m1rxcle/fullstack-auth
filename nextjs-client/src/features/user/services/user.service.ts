import { IUser } from '@/features/auth/types'

import { api } from '@/shared/api'

import { TypeSettingSchema } from '../schemas'

class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async updateProfile(body: TypeSettingSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}
}

export const userService = new UserService()
