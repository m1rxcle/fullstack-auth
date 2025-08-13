import Link from 'next/link'

import { cn } from '@/shared/utils'

import { buttonVariants } from '../shared/components/ui'

export default function Home() {
	return (
		<div className='space-y-5 text-center'>
			<h1 className='text-4xl font-bold'>Главная страница</h1>
			<Link href='/auth/login' className={cn(buttonVariants(), 'p-6')}>
				Войти в аккаунт
			</Link>
		</div>
	)
}
