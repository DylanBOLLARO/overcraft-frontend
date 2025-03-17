'use client'

import { BuildsList } from '@/components/builds-list'
import { useAuth } from '@/components/providers/context-provider'
import { Spinner } from '@/components/spinner'
import { ImportBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/import-build-button'
import { TypographySmall } from '@/components/typography'
import { CustomButton } from '@/components/ui-customs/button'
import { Button } from '@/components/ui/button'
import { useMyBuilds } from '@/lib/queries'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

export default function Page() {
    const { user } = useAuth()
    const userId = user?.userinfo?.sub ?? null

    if (!userId) return <></>

    const router = useRouter()

    const { data: builds, isFetched, refetch } = useMyBuilds(userId)

    return (
        <div className="flex-1 flex flex-col gap-5">
            <div className="flex gap-3">
                <CustomButton onClick={() => router.push('/create')}>
                    <TypographySmall str={'Create'} />
                </CustomButton>
                <ImportBuildButton userId={userId} refetch={refetch} />
            </div>

            {!isFetched && (
                <div className="py-10">
                    <Spinner size={'large'}>
                        <p className="text-xl">Loading...</p>
                    </Spinner>
                </div>
            )}

            {isFetched && (
                <>
                    {_.isEmpty(builds) && <></>}
                    {!_.isEmpty(builds) && <BuildsList builds={builds} />}
                </>
            )}
        </div>
    )
}
