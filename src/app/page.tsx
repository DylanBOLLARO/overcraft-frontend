'use client'

import { BuildsList } from '@/components/builds-list'
import { FilterSelectBuild } from '@/components/filter-select-build'
import { useBuilds } from '@/lib/queries'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { DEFAULT_VALUES_SEARCH_FILTER_SEARCH_BUILDS } from '@/constants/constants'

export default function Home() {
    const stringifyParamsForSearch = (params: any) => {
        return queryString.stringify(params)
    }

    const [filterSearchBuilds, setFilterSearchBuilds] = useState(
        DEFAULT_VALUES_SEARCH_FILTER_SEARCH_BUILDS
    )

    const {
        isLoading,
        error,
        data: builds,
        refetch,
    } = useBuilds(stringifyParamsForSearch(filterSearchBuilds))

    useEffect(() => {
        refetch()
    }, [filterSearchBuilds])

    if (isLoading) return

    if (error) return console.error('An error has occurred: ' + error.message)

    return (
        <div className="flex flex-col gap-y-5">
            <FilterSelectBuild
                filterSearchBuilds={filterSearchBuilds}
                setFilterSearchBuilds={setFilterSearchBuilds}
            />
            {builds?.length > 0 && <BuildsList builds={builds} />}
        </div>
    )
}
