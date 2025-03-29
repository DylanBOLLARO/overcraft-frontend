import { cva } from 'class-variance-authority'

export const ResponseFormat = {
    data: 'data',
    totalItems: 'totalItems',
    page: 'page',
    take: 'take',
} as const

export const PlayableRaces = {
    all: 'all',
    terran: 'terran',
    zerg: 'zerg',
    protoss: 'protoss',
} as const

export const RequestParameters = {
    query: 'query',
    page: 'page',
    take: 'take',
    race: 'race',
    v_race: 'v_race',
} as const

export const RequestParametersDefaultValues = {
    [RequestParameters.query]: '',
    [RequestParameters.page]: 1,
    [RequestParameters.take]: 18,
    [RequestParameters.race]: 'all',
    [RequestParameters.v_race]: 'all',
}

export const StepVariants = {
    INFO: 'INFO',
    SUPPLY: 'SUPPLY',
    ATTACK: 'ATTACK',
    BUILDING: 'BUILDING',
    GAZ: 'GAZ',
    UNIT: 'UNIT',
    UPGRADE: 'UPGRADE',
} as const

export const stepVariants = cva('', {
    variants: {
        variant: {
            [StepVariants.INFO]: 'bg-cyan-700',
            [StepVariants.UPGRADE]: 'bg-purple-950',
            [StepVariants.SUPPLY]: 'bg-yellow-950',
            [StepVariants.ATTACK]: 'bg-red-950',
            [StepVariants.BUILDING]: 'bg-zinc-900',
            [StepVariants.GAZ]: 'bg-green-950',
            [StepVariants.UNIT]: 'bg-blue-950',
        },
    },
    defaultVariants: {
        variant: 'INFO',
    },
})
