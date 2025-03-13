'use client'

import { DEFAULT_VALUES_SEARCH_FILTERS_BUILDS_PROPERTIES } from '@/constants/constants'
import { useBuilds } from '@/lib/queries'
import { objectToQueryString } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

const SearchContext = createContext<any>(undefined)

export const SearchProvider = ({ children }: any) => {
    const [searchFiltersBuildsProperties, setSearchFiltersBuildsProperties] =
        useState(DEFAULT_VALUES_SEARCH_FILTERS_BUILDS_PROPERTIES)

    const {
        isLoading,
        isFetched,
        error,
        data: builds,
    } = useBuilds(objectToQueryString(searchFiltersBuildsProperties))

    return (
        <SearchContext.Provider
            value={{
                searchFiltersBuildsProperties,
                setSearchFiltersBuildsProperties,
                builds,
                isLoading,
                isFetched,
                error,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider

export const useSearch = () => {
    const searchContext = useContext(SearchContext)
    if (searchContext === undefined) {
        throw new Error('useSearch must be inside a SearchProvider')
    }
    return searchContext
}
