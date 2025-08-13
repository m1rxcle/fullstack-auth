import { Metadata } from 'next'
import React from 'react'

import LoginForm from '@/features/auth/components/login-form'

export const metadata: Metadata = {
	title: 'Вход в аккаунт'
}

const LoginPage = () => {
	return <LoginForm />
}

export default LoginPage
