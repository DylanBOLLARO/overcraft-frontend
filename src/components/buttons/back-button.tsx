import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { TypographySmall } from '../typography'
import { Button } from '@/components/ui/button'

export const BackButton = () => {
    return (
        <Button
            onClick={() => {
                window.history.back()
            }}
        >
            <ChevronLeft />
            <TypographySmall str={'Back'} />
        </Button>
    )
}
