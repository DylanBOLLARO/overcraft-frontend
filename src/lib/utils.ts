import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import * as _ from 'lodash'
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

export const removingBuildReferences = (build: any) => {
    const propsToPick = ['description', 'name', 'race', 'v_race', 'type']
    const cleanedSteps = build.steps.map((step: any) =>
        _.pick(step, ['description', 'population', 'position', 'timer'])
    )
    return { ..._.pick(build, propsToPick), steps: cleanedSteps }
}

export const buildsExport = (build: any) => {
    const cleanedBuild = removingBuildReferences(build)
    const fileName = `${_.kebabCase(build.name)}.json`
    const data = new Blob([JSON.stringify(cleanedBuild)], { type: 'text/json' })
    const jsonURL = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = jsonURL
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(jsonURL)
}

export const buildsImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
        console.error('No file selected.')
        return
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string)
                resolve(json)
            } catch (err) {
                reject('Error reading the JSON file.')
            }
        }
        reader.onerror = (error) => reject(error)
        reader.readAsText(file)
    })
}
