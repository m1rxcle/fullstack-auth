import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ModeToggle } from '../shared/components/ui'
import { MainProvider } from '../shared/providers'
import '../shared/styles/globals.css'

const montserrat = Montserrat({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Курс по авторизации',
		template: '%s | Курс по авторизации'
	},
	description: 'Это учебный проект по авторизации'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${montserrat.className}`}>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col bg-[#b5b6ff9f]'>
						<ModeToggle />
						<div className='flex h-screen w-full items-center justify-center p-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
