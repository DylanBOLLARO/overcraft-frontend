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
            [StepVariants.INFO]: 'bg-step-info hover:bg-step-info text-black',
            [StepVariants.UPGRADE]: 'bg-step-upgrade hover:bg-step-upgrade',
            [StepVariants.SUPPLY]:
                'bg-step-supply hover:bg-step-supply text-black',
            [StepVariants.ATTACK]: 'bg-step-attack hover:bg-step-attack',
            [StepVariants.BUILDING]: 'bg-step-building hover:bg-step-building',
            [StepVariants.GAZ]: 'bg-step-gaz hover:bg-step-gaz',
            [StepVariants.UNIT]: 'bg-step-unit hover:bg-step-unit',
        },
    },
    defaultVariants: {
        variant: 'INFO',
    },
})
