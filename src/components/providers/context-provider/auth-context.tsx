'use client'

import { useUser } from '@/lib/queries'
import _ from 'lodash'
import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext<any>(undefined)

export const AuthProvider = ({ children }: any) => {
    const { data: user = undefined, refetch: userRefetch } = useUser()

    const [userId, setUserId] = useState(undefined)
    const [userBuilds, setUserBuilds] = useState<Array<any>>([])
    const [userFavorites, setUserFavorites] = useState<Array<any>>([])

    useEffect(() => {
        if (_.isUndefined(user)) return
        const { sub, builds, favorites } = user?.userinfo || {}

        setUserId(user ? sub : null)
        setUserBuilds(user ? builds : [])
        setUserFavorites(user ? favorites : [])
    }, [user])

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
