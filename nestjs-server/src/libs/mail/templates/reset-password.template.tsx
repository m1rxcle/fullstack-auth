/* eslint-disable prettier/prettier */

import { Body, Heading, Link, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface ResetPasswordTemplateProps {
  domain: string
  token: string
}

export const ResetPasswordTemplate= ({ domain, token }: ResetPasswordTemplateProps) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`
  return (
    <Tailwind>
      <Html>
        <Body>
          <Heading className='text-black'>
            Сброс пароля
          </Heading>
          <Text className='font-bold text-xl'>
            Привет! Вы запросили сброс пароля. Пожалуйста, перейдите по ссылке ниже, чтобы создать новый пароль:
          </Text>
          <Link className='p-3 border-2 border-black rounded-md text-black bg-gray-200 mb-2 text-md' href={confirmLink}>Подтвердить сброс пароля</Link>
          <Text className='text-gray-500'>
            Эта ссылка действительна в течении 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте это письмо.
          </Text>
          <Text className='font-italic text-gray-500'>
            Спасибо за использование нашего сервиса!
          </Text>
        </Body>
    </Html>
    </Tailwind>
    
  );
};