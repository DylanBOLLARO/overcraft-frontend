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

export const getBuilds = async (params: any) => {
    try {
        const { data } = await axiosInstance(
            `${MODULE_NESTJS.BUILD}${params && `?${params}`}`
        )
        return data
    } catch (error) {
        console.error(error)
    }
}
