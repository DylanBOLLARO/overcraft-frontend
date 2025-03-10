import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getBuild, getBuilds } from './api'

//-------------------------
//---START--BUILD---------
//-------------------------

export function useBuild(buildId: string) {
    return useQuery({
        queryKey: ['useBuild'],
        queryFn: async () => await getBuild(buildId),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: !!buildId,
    })
}

export function useBuilds(params: any) {
    return useQuery({
        queryKey: ['useBuilds', params || 0],
        queryFn: async () => await getBuilds(params),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}

//-------------------------
//-----END--BUILD---------
//-------------------------
