import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { AuthContextProvider } from './AuthContext'

import type { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <ChakraProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </ChakraProvider>
    )
}