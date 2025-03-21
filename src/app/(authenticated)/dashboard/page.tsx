'use client'

import { BuildsList } from '@/components/builds-list'
import { useAuth } from '@/components/providers/context-provider'
import { ImportBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/import-build-button'
import { TypographySmall } from '@/components/typography'
import { CustomButton } from '@/components/ui-customs/button'
import { useMyBuilds } from '@/lib/queries'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { BuildEdit } from '@/components/build-edit'
import { Loader } from '@/components/loader'

export default function Page() {
    const { user } = useAuth()
    const router = useRouter()

    const {
        data: builds,
        isFetched,
        refetch,
    } = useMyBuilds(user?.userinfo?.sub)

    return (
        <div className="flex-1 flex flex-col gap-5">
            <div className="flex gap-3">
                <BuildEdit />
                <ImportBuildButton
                    userId={user?.userinfo?.sub}
                    refetch={refetch}
                />
            </div>

            {!isFetched && <Loader />}
            {isFetched && !_.isEmpty(builds) && <BuildsList builds={builds} />}
        </div>
    )
}
