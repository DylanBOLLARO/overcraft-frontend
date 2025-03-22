'use client'

import { useUser } from '@/lib/queries'
import { useContext, createContext } from 'react'

const AuthContext = createContext<any>(undefined)

export const AuthProvider = ({ children }: any) => {
    const { data: user = undefined, refetch: userRefetch } = useUser()

    const userId = (user ? user?.userinfo?.sub : user) || undefined
    const userBuilds = (user ? user?.userinfo?.builds : user) || []
    const userFavorites = (user ? user?.userinfo?.favorites : user) || []

    return (
        <AuthContext.Provider
            value={{
                user,
                userId,
                userBuilds,
                userFavorites,
                userRefetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        throw new Error('useAuth must be inside a AuthProvider')
    }
    return authContext
}
