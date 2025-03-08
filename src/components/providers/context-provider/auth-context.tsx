'use client'

import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext<any>(undefined)

export const AuthProvider = ({ children }) => {
    const userData: any = {}

    const [user, setUser] = useState(userData)

    const isEmpty = (obj: Object) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('/user')
                const userResponse = await response.text()
                setUser(JSON.parse(userResponse))
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
