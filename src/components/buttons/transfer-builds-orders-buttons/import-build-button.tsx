import React from 'react'
import { Download } from 'lucide-react'
import { buildsImport, cn } from '@/lib/utils'
import { axiosInstance } from '@/lib/networking'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '../../ui/button'
import { useAuth } from '@/components/providers/context-provider'

export const ImportBuildButton = ({ userId, refetch }: any) => {
    const { userRefetch } = useAuth()

    return (
        <>
            <Input
                id="btn-import"
                type="file"
                className="hidden"
                onChange={async (e) => {
                    if (!e.target.files?.length) return
                    try {
                        const build: any = await buildsImport(e)
                        await axiosInstance.post(`/builds/import-build`, {
                            ...build,
                            userId,
                        })
                        await userRefetch()
                        await refetch()
                    } catch (error) {
                        console.error('Error importing the file:', error)
                    }
                    e.target.value = ''
                }}
            />
            <Label
                htmlFor="btn-import"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-9 font-semibold px-10 bg-black border-none gap-5 cursor-pointer'
                )}
            >
                <Download className="h-3.5 w-3.5" />
                <p>Import</p>
            </Label>
        </>
    )
}
