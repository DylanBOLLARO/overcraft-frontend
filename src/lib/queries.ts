import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
    getBuild,
    getBuilds,
    getMyBuilds,
    getMyFavorites,
    getUser,
} from './api'
import _ from 'lodash'

export function useBuild(buildId: string) {
    return useQuery({
        queryKey: ['useBuild'],
        queryFn: async () => (await getBuild(buildId)) || null,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: !!buildId,
    })
}

export function useBuilds(params: string) {
    return useQuery({
        queryKey: ['useBuilds', params],
        queryFn: async () => (await getBuilds(params)) || [],
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}

export function useMyBuilds(userId: string) {
    return useQuery({
        queryKey: ['useMyBuilds'],
        queryFn: async () => (await getMyBuilds(userId)) || [],
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}

export function useMyFavorites(userId: string) {
    return useQuery({
        queryKey: ['useMyFavorites'],
        queryFn: async () => (await getMyFavorites(userId)) || [],
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}

export function useUser() {
    return useQuery({
        queryKey: ['useUser'],
        queryFn: async () => (await getUser()) || null,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
        placeholderData: keepPreviousData,
    })
}
