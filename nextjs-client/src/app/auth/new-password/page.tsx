import { Metadata } from 'next'

import NewPasswordForm from '@/features/auth/components/new-password-form'

export const metadata: Metadata = {
	title: 'Новый пароль'
}

export default function NewPasswordPage() {
	return <NewPasswordForm />
}
