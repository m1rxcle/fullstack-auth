import { Metadata } from 'next'
import React from 'react'

import RegisterForm from '@/features/auth/components/register-form'

export const metadata: Metadata = {
	title: 'Создать аккаунт'
}

const RegisterPage = () => {
	return <RegisterForm />
}
export default RegisterPage
