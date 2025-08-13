'use client'

import { LuLogOut } from 'react-icons/lu'

import { IUser } from '@/features/auth/types'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui'

import { useLogoutMutation } from '../hooks'

interface UserButtonProps {
	user: IUser
}

export default function UserButton({ user }: UserButtonProps) {
	const { logout, isLoadingLogout } = useLogoutMutation()

	if (!user) return null
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.picture} />
					<AvatarFallback>
						{user.displayName.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				<DropdownMenuItem
					disabled={isLoadingLogout}
					onClick={() => logout()}
					className='cursor-pointer'
				>
					<LuLogOut className='mr-2 size-4' />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
