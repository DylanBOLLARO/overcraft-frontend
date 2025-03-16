import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import _ from 'lodash'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatSeconds(seconds: number): string {
    const date = new Date(seconds * 1000)
    return format(date, 'mm:ss')
}

export function extractUUID(str: string): string | null {
    const match = str.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    )
    return match ? match[0] : null
}

export function getBadgeVariantFromLabel(label: string) {
    if (['z'].includes(label.toLowerCase())) {
        return 'zerg'
    }

    if (['t'].includes(label.toLowerCase())) {
        return 'terran'
    }

    if (['p'].includes(label.toLowerCase())) {
        return 'protoss'
    }
}

export const objectToQueryString = (obj: Record<string, unknown>): string => {
    if (!obj) return ''

    const urlParams = Object.entries(obj)
        .filter(([key, value]) => {
            return (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                value !== 'all' &&
                !(key === 'page' && value === 1) &&
                !(key === 'take' && value === 18)
            )
        })
        .reduce((acc, [key, value]) => {
            acc.set(key, String(value))
            return acc
        }, new URLSearchParams())

    return urlParams.toString().length ? `?${urlParams.toString()}` : ''
}
