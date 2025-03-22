'use client'

import { BuildsList } from '@/components/builds-list'
import { useAuth } from '@/components/providers/context-provider'
import { Spinner } from '@/components/spinner'
import { useMyFavorites } from '@/lib/queries'
import _ from 'lodash'

export default function Home() {
    const { userId } = useAuth()
    const { isFetched, data: builds } = useMyFavorites(userId)

    return (
        <div className="flex flex-col gap-y-5">
            {!isFetched && (
                <div className="py-10">
                    <Spinner size={'large'}>
                        <p className="text-xl">Loading...</p>
                    </Spinner>
                </div>
            )}

            {isFetched && (
                <>
                    {_.isEmpty(builds) && (
                        <p className="py-10 text-xl text-center">
                            You have no favorites
                        </p>
                    )}

                    {!_.isEmpty(builds) && <BuildsList builds={builds} />}
                </>
            )}
        </div>
    )
}
