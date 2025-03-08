'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME } from '../constants/variable'

export async function createCookie(value: any) {
    cookies().set({
        name: COOKIE_NAME,
        value,
        httpOnly: true,
        path: '/',
    })
}

export async function getCookie() {
    return cookies().get(COOKIE_NAME)?.value
}

export async function deleteCookie() {
    cookies().delete(COOKIE_NAME)
}
