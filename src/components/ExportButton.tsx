import React from 'react'
import { Button } from './ui/button'
import { Upload } from 'lucide-react'

const ExportButton = ({ selectedUserBuild }: any) => {
    return (
        <Button
            variant={'outline'}
            onClick={() => {
                // jsonFileDownload(selectedUserBuild)
            }}
            className="gap-2"
        >
            <Upload className="h-4 w-4" />
            <p>Export</p>
        </Button>
    )
}

export default ExportButton
