import React, { createContext, useContext, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

import { supabase } from '../config/supabase'

import type { PropsWithChildren } from 'react'

interface AuthContextProps {
    session: null | unknown
}

const initialValue: AuthContextProps = {
    session: null
}

const AuthContext = createContext<AuthContextProps>(initialValue)

export const AuthContextProvider = ({ children }: PropsWithChildren<AuthContextProps>) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
       throw new Error('useAuthContext must be used within a AuthContextProvider')
    }

    return context
}