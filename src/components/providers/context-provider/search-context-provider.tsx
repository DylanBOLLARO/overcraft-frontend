// 'use client'

// import { createContext, useCallback, useContext, useRef, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import {
//     DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS,
//     DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS_TYPE_ARRAY,
//     DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS_TYPE_NO_ARRAY,
// } from '@/constants'
// import { debounce } from '@/lib/utils'
// import _ from 'lodash'

// const SearchContext = createContext<any>(undefined)

// export const SearchContextProvider = ({ children }: any) => {
//     const searchParams = useSearchParams()
//     const formRef = useRef<HTMLFormElement | null>(null)

//     const [advancedSearchParams, setAdvancedSearchParams] = useState<any>(
//         Object.entries(DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS).reduce(
//             (acc: any, [currKey, currValue]: any) => {
//                 if (
//                     Object.keys(
//                         DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS_TYPE_NO_ARRAY
//                     )
//                         .join(',')
//                         .includes(currKey)
//                 ) {
//                     return {
//                         ...acc,
//                         [currKey]: searchParams.get(currKey) ?? currValue,
//                     }
//                 } else {
//                     return {
//                         ...acc,
//                         [currKey]:
//                             searchParams.get(currKey)?.split(',') ?? currValue,
//                     }
//                 }
//             },
//             {}
//         )
//     )

//     //src : https://nextjs.org/docs/app/api-reference/functions/use-search-params
//     const createQueryString = useCallback(
//         (name: string, value: string) => {
//             const params = new URLSearchParams(searchParams.toString())
//             params.set(name, value)
//             return params.toString()
//         },
//         [searchParams]
//     )

//     const resetAdvancedSearchParams = () => {
//         setAdvancedSearchParams({
//             ...advancedSearchParams,
//             ...Object.fromEntries(
//                 Object.entries(DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS).filter(
//                     ([key]) => key !== 'query'
//                 )
//             ),
//         })
//     }

//     const resetQuery = () => {
//         if (formRef.current) {
//             formRef.current.reset()
//         }

//         setAdvancedSearchParams({
//             ...advancedSearchParams,
//             ...Object.fromEntries(
//                 Object.entries(DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS).filter(
//                     ([key]) => key === 'query'
//                 )
//             ),
//         })
//     }

//     const getParams = (advancedSearchParams) => {
//         const filteredEntries = Object.entries(advancedSearchParams).filter(
//             ([key, value]) =>
//                 !!value &&
//                 Object.keys(
//                     DEFAULT_VALUES_ADVANCED_SEARCH_PARAMS_TYPE_ARRAY
//                 ).includes(key)
//         )
//         return filteredEntries
//     }

//     const [accordionState, setAccordionState] = useState(
//         getParams(advancedSearchParams).length > 0 ? 'open' : 'close'
//     )

//     const [metadataAndItems, setMetadataAndItems] = useState({
//         page: undefined,
//         number: undefined,
//         results: undefined,
//         totalResults: undefined,
//     })

//     const debouncedSearchData = debounce((value: string) => {
//         setAdvancedSearchParams((prev: any) => {
//             return { ...prev, page: 1, query: value }
//         })
//     })

//     return (
//         <SearchContext.Provider
//             value={{
//                 formRef,
//                 metadataAndItems,
//                 advancedSearchParams,
//                 accordionState,
//                 createQueryString,
//                 resetAdvancedSearchParams,
//                 resetQuery,
//                 setAccordionState,
//                 setAdvancedSearchParams,
//                 setMetadataAndItems,
//                 debouncedSearchData,
//             }}
//         >
//             {children}
//         </SearchContext.Provider>
//     )
// }

// export const useSearchContext = () => {
//     const searchContext = useContext(SearchContext)
//     if (searchContext === undefined) {
//         throw new Error(
//             'useSearchContext must be inside a SearchContextProvider'
//         )
//     }
//     return searchContext
// }
