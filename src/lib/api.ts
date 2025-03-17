import { MODULE_NESTJS } from '@/constants/enum'
import { axiosInstance } from './networking'

export const getBuild = async (buildId: string) => {
    try {
        const { data } = await axiosInstance(
            `${MODULE_NESTJS.BUILD}/${buildId}`
        )
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getBuilds = async (params: string) => {
    try {
        return (await axiosInstance(`${MODULE_NESTJS.BUILD}${params}`))?.data
    } catch (error) {
        console.error(error)
    }
}

export const getMyBuilds = async (userId: string) => {
    try {
        return (await axiosInstance(`/user/${userId}/builds`))?.data
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async () => {
    try {
        return (await axiosInstance('/auth/user'))?.data
    } catch (error) {
        console.error(error)
    }
}
