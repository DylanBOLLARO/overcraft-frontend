'use client'

import { BuildsList } from '@/components/builds-list'
import { FilterSelectBuild } from '@/components/filter-select-build'
import { useBuilds } from '@/lib/queries'
import { useEffect, useState } from 'react'
import queryString from 'query-string'

export default function Home() {
    const stringifyParamsForSearch = (params: any) => {
        return queryString.stringify(params)
    }

    const defaultValueSearchFilterSearchBuilds = {
        q: '',
        type: 'all',
        difficulty: 'all',
        race: 'all',
        v_race: 'all',
    }

    const [filterSearchBuilds, setFilterSearchBuilds] = useState(
        defaultValueSearchFilterSearchBuilds
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
        <div className="flex flex-col gap-5">
            <FilterSelectBuild
                filterSearchBuilds={filterSearchBuilds}
                setFilterSearchBuilds={setFilterSearchBuilds}
                defaultValueSearchFilterSearchBuilds={
                    defaultValueSearchFilterSearchBuilds
                }
            />
            {builds?.length > 0 && <BuildsList builds={builds} />}
        </div>
    )
}
