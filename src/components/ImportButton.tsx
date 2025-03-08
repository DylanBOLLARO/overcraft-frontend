import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Download } from 'lucide-react'
import { jsonFileUpload } from '../lib/utils'
import { import_build } from '../lib/user'

export const ImportButton = ({ refetch, userId }: any) => {
    return (
        <div>
            <Input
                id="btn-import"
                type="file"
                className="hidden"
                onChange={(e) => {
                    jsonFileUpload(e)
                        .then((parsedJson) => {
                            import_build(JSON.stringify(parsedJson), userId)
                        })
                        .then(() => {
                            refetch()
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    e.target.value = ''
                }}
            />

            <Label
                htmlFor="btn-import"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 h-7 gap-1 text-sm text-secondary-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
                <Download className="h-3.5 w-3.5" />
                <p>Import</p>
            </Label>
        </div>
    )
}
