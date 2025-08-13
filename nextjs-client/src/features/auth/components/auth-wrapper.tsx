import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui'

import { AuthSocial } from './auth-social'

interface AuthWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

export const AuthWrapper = ({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref,
	isShowSocial = false
}: PropsWithChildren<AuthWrapperProps>) => {
	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle className='mb-0 text-2xl'>{heading}</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{isShowSocial && <AuthSocial />}
				{children}
			</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Button
						variant='link'
						className='w-full font-normal'
						asChild
					>
						<Link href={backButtonHref}>
							<span className='hover:underline'>
								{backButtonLabel}
							</span>
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
