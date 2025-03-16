'use client'

import { BuildsList } from '@/components/builds-list'
import { SelectBuildsForm } from '@/components/select-builds-form'
import { Spinner } from '@/components/spinner'
import { RequestParametersDefaultValues } from '@/constants'
import { useBuilds } from '@/lib/queries'
import { objectToQueryString } from '@/lib/utils'
import _ from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Home() {
    const searchParams = useSearchParams()

    const getDefaultValues = (searchParams: any) => ({
        query:
            searchParams.get('query') || RequestParametersDefaultValues.query,
        page: searchParams.get('page') || RequestParametersDefaultValues.page,
        take: searchParams.get('take') || RequestParametersDefaultValues.take,
        race: searchParams.get('race') || RequestParametersDefaultValues.race,
        v_race:
            searchParams.get('v_race') || RequestParametersDefaultValues.v_race,
    })

    const searchFiltersBuildsProperties = useMemo(() => {
        return getDefaultValues(searchParams)
    }, [searchParams.toString()])

    const { isFetched, data: builds } = useBuilds(
        objectToQueryString(searchFiltersBuildsProperties)
    )

    return (
        <div className="flex flex-col gap-y-5">
            <SelectBuildsForm
                defaultValues={searchFiltersBuildsProperties}
                totalItems={Math.ceil(builds?.totalItems / builds?.take)}
            />

            {!isFetched && (
                <div className="py-10">
                    <Spinner size={'large'}>
                        <p className="text-xl">Loading...</p>
                    </Spinner>
                </div>
            )}

            {isFetched && (
                <>
                    {_.isEmpty(builds.data) && (
                        <div className="py-10">
                            <p className="text-xl text-center">
                                No results for your search
                            </p>
                        </div>
                    )}

                    {!_.isEmpty(builds.data) && (
                        <BuildsList builds={builds.data} />
                    )}
                </>
            )}
        </div>
    )
}
