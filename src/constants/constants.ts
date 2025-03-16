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
