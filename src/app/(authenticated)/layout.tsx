'use client'

import { useAuth } from '@/components/providers/context-provider'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { userId } = useAuth()

    useEffect(() => {
        if (_.isNull(userId)) {
            router.push('/')
        }
    }, [userId, router])

    return <>{!_.isEmpty(userId) && children}</>
}
