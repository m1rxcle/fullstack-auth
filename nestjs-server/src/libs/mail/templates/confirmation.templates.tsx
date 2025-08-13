/* eslint-disable prettier/prettier */

import { Body, Heading, Link, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface ConfirmationTemplateProps {
  domain: string
  token: string
}

export const ConfirmationTemplate= ({ domain, token }: ConfirmationTemplateProps) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
  return (
    <Tailwind>
      <Html>
        <Body>
          <Heading className='text-black'>
            Подтверждение почты
          </Heading>
          <Text>
            Привет! Чтобы подтвердить свой адрес электронной почты, пожалуйста, перейдите по ссылке ниже:
          </Text>
          <Link href={confirmLink}>Подтвердить почту</Link>
          <Text>
            Эта ссылка действительна в течении 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте это письмо.
          </Text>
          <Text>
            Спасибо за использование нашего сервиса!
          </Text>
        </Body>
    </Html>
    </Tailwind>
    
  );
};