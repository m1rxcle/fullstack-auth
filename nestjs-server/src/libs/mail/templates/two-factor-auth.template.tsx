/* eslint-disable prettier/prettier */

import { Body, Heading, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface TwoFactorAuthTemplateProps {
  
  token: string
}

export const TwoFactorAuthTemplate= ({ token }: TwoFactorAuthTemplateProps) => {
  return (
    <Tailwind>
      <Html>
        <Body>
          <Heading className='text-black'>
            Двухфакторная аутентификация
          </Heading>
          <Text className='font-bold text-xl'>
            Ваш код двухфакторной аутентификации: <strong>{token}</strong> 
          </Text>
          <Text>
            Пожалуйста, введите этот код в приложение, чтобы подтвердить свой аккаунт.
          </Text>
          <Text className='text-gray-500'>
            Если вы не запрашивали двухфакторную аутентификацию, просто проигнорируйте это письмо.
          </Text>
        </Body>
    </Html>
    </Tailwind>
    
  );
};