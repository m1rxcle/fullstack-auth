import { Metadata } from 'next'

import NewVerificationForm from '@/features/auth/components/new-verification-form'

export const metadata: Metadata = {
	title: 'Подтверждение аккаунта'
}

export default function NewVerificationPage() {
	return <NewVerificationForm />
}
