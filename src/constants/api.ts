import { MODULE_NESTJS, VERBES_HTTP } from './enum'

export const GET_CONNECTED_USER_BUILDS = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
}

export const PUBLISH_CONNECTED_USER_BUILD = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.BUILD}`,
}

export const GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.STEP}`,
}

export const ADD_STEP_OF_BUILD = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.STEP}`,
}

export const DELETE_BUILD = {
    method: VERBES_HTTP.DELETE,
    url: `${MODULE_NESTJS.BUILD}`,
}

export const MOVE_STEP_IN_BUILD_STEPS = {
    method: VERBES_HTTP.PATCH,
    url: `${MODULE_NESTJS.STEP}/move-position`,
}

export const DELETE_STEP_IN_BUILD_STEPS = {
    method: VERBES_HTTP.DELETE,
    url: `${MODULE_NESTJS.STEP}`,
}

export const PATCH_BUILD = {
    method: VERBES_HTTP.PATCH,
    url: `${MODULE_NESTJS.BUILD}`,
}

export const GET_ALL_PUBLICS_BUILDS = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
}

export const GET_PUBLIC_BUILD_BY_ID = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
}

// OVERCRAFT V2:
export const SIGNUP = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}/signup`,
}

export const SIGNIN = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}/signin`,
}

export const GET_CONNECTED_USER = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}/get-connected-user-id`,
}

export const GET_USER_PROFILE_BY_ID = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.USER}/username`,
}

export const GET_USER_PROFILE_BY_CONFIG = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.USER}/config`,
}
