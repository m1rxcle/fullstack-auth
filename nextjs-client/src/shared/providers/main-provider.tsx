'use client'

import React, { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { TanstackQueryProvider } from './tanstack-query-provider'
import { ThemeProvider } from './theme-provider'
import { ToastProvider } from './toast-provider'

export const MainProvider = ({ children }: PropsWithChildren<unknown>) => {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				enableSystem
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
			>
				<ToastProvider />
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
