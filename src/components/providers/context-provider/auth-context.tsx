'use client'

import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext<any>(undefined)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(undefined)

    const isEmpty = (obj: any) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('/auth/user')
                const userResponse = await response.text()
                setUser(!!userResponse ? JSON.parse(userResponse) : null)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isEmpty,
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
