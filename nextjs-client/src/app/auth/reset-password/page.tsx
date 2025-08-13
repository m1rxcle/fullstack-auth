import { Metadata } from 'next'
import React from 'react'

import ResetPasswordForm from '@/features/auth/components/reset-password-form'

export const metadata: Metadata = {
	title: 'Сброс пароля'
}

export default function ResetPassword() {
	return <ResetPasswordForm />
}
