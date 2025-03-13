'use client'

import { BuildsList } from '@/components/builds-list'
import { FilterSelectBuild } from '@/components/filter-select-build'
import { useSearch } from '@/components/providers/context-provider'
import { Spinner } from '@/components/spinner'
import _ from 'lodash'

export default function Home() {
    const { builds, isFetched } = useSearch()

    return (
        <div className="flex flex-col gap-y-5">
            <FilterSelectBuild />

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
                        <div className="py-10">
                            <p className="text-xl text-center">
                                No results for your search
                            </p>
                        </div>
                    )}

                    {!_.isEmpty(builds) && <BuildsList builds={builds} />}
                </>
            )}
        </div>
    )
}
