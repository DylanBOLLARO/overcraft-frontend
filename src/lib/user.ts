'use server'

import {
    ADD_STEP_OF_BUILD,
    DELETE_BUILD,
    DELETE_STEP_IN_BUILD_STEPS,
    GET_CONNECTED_USER,
    MOVE_STEP_IN_BUILD_STEPS,
    PATCH_BUILD,
    SIGNIN,
    SIGNUP,
} from '../constants/api'
import { createBuild } from './api'
import { createCookie } from './cookie'
import { base_query_axios } from './networking'

export const signin = async (values: any) => {
    try {
        const tokens = await base_query_axios(SIGNIN, values)
        if (!tokens)
            throw new Error(
                'No tokens returned by the API during connection; authentication not possible.'
            )
        await createCookie(tokens.access_token)
        return tokens
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const signup = async (values: any) => {
    try {
        const tokens = await base_query_axios(SIGNUP, values)
        if (!tokens)
            throw new Error(
                'No tokens returned by the API during connection; authentication not possible.'
            )
        await createCookie(tokens.access_token)
        return tokens
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const get_connected_user_id = async () => {
    try {
        const data = await base_query_axios(GET_CONNECTED_USER, null, true)
        if (!data)
            throw new Error(
                'No user ID returned by the API during connection; authentication not possible.'
            )
        return data
    } catch (error) {
        console.error(JSON.stringify(error))
        return undefined
    }
}

export const add_step_build = async (build: any) => {
    try {
        await base_query_axios(ADD_STEP_OF_BUILD, build, true)
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const delete_build_by_build_id = async (id: number) => {
    try {
        await base_query_axios(DELETE_BUILD, null, true, `/${id}`)
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const move_step_in_build_steps = async (data: any) => {
    try {
        await base_query_axios(MOVE_STEP_IN_BUILD_STEPS, data, true)
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const delete_step_in_build_steps = async (id: number) => {
    try {
        await base_query_axios(DELETE_STEP_IN_BUILD_STEPS, null, true, `/${id}`)
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const import_build = async (json: any, userId: any) => {
    try {
        const { steps, ...build } = JSON.parse(json)
        const { id: buildId } = await createBuild(userId, build)

        steps.map(async (step: any, index: number) => {
            const { description, timer, population } = step
            await add_step_build({
                description,
                build_id: '' + buildId,
                position: '' + index + 1,
                timer: '' + timer,
                population: '' + population,
            })
        })
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}

export const patch_build = async (build_metadata: any) => {
    const {
        title,
        description,
        race,
        v_race,
        is_public,
        id,
        difficulty,
        type,
    } = build_metadata
    try {
        const { id: user_id } = await get_connected_user_id()
        return await base_query_axios(
            PATCH_BUILD,
            {
                ...{
                    title: '' + title,
                    description: '' + description,
                    race: '' + race,
                    v_race: '' + v_race,
                    is_public: '' + is_public,
                    difficulty: +difficulty,
                    type,
                },
                user_id: '' + user_id,
            },
            true,
            `/${id}`
        )
    } catch (error) {
        console.error(JSON.stringify(error))
    }
}
