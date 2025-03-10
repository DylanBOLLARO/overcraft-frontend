'use client'

import { BuildsList } from '@/components/builds-list'
import { useAuth } from '@/components/providers/context-provider'
import { TypographySmall } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/networking'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
    const { user } = useAuth()
    const [userBuilds, setUserBuilds] = useState([])
    const router = useRouter()
    useEffect(() => {
        const userId = user?.userinfo?.sub ?? null
        if (!userId) return

        async function fetchUser() {
            try {
                const response = await axiosInstance.get(`/user/${userId}`)
                setUserBuilds(response.data.build)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [user])

    return (
        <div className="flex-1 flex flex-col gap-5">
            <Button
                className="h-auto font-semibold w-fit"
                onClick={() => router.push('/create')}
            >
                <TypographySmall str={'Create'} />
            </Button>

            {/* <div className="flex flex-row gap-2 ml-auto">
                <ImportButton refetch={{}} userId={user?.id} />
                <DialogCreateBuild refetch={{}} userId={user?.id} />
            </div> */}
            <BuildsList builds={userBuilds} />
        </div>
    )
}
