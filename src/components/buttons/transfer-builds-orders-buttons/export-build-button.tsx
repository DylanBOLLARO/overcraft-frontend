import React from 'react'
import { Upload } from 'lucide-react'
import { buildsExport } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const ExportBuildButton = (build: any) => {
    return (
        <Button
            className="bg-cyan-700 hover:bg-cyan-700/90 text-foreground"
            onClick={() => {
                buildsExport(build)
            }}
        >
            <Upload />
            <p>Export</p>
        </Button>
    )
}
