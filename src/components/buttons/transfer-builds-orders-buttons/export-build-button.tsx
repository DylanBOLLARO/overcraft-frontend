import React from 'react'
import { Upload } from 'lucide-react'
import { buildsExport } from '@/lib/utils'
import { CustomButton } from '../../ui-customs/button'

export const ExportBuildButton = (build: any) => {
    return (
        <CustomButton
            onClick={() => {
                buildsExport(build)
            }}
        >
            <Upload />
            <p>Export</p>
        </CustomButton>
    )
}
