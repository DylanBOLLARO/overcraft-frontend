import React from 'react'
import { BookCopy } from 'lucide-react'
import { removingBuildReferences } from '@/lib/utils'
import { axiosInstance } from '@/lib/networking'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/context-provider'
import { Button } from '@/components/ui/button'

export const CloneBuildButton = ({ build, userId }: any) => {
    const router = useRouter()
    const { userRefetch } = useAuth()

    const cloneBuild = async () => {
        const { slug }: any =
            (
                await axiosInstance.post(`/builds/import-build`, {
                    ...removingBuildReferences(build),
                    userId,
                })
            ).data || {}
        await userRefetch()
        router.push(`/builds/${slug}`)
    }

    return (
        <Button
            onClick={cloneBuild}
            className="bg-green-700 hover:bg-green-700/90 text-foreground"
        >
            <BookCopy />
            Clone
        </Button>
    )
}
