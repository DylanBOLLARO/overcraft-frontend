import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { CustomButton } from '@/components/ui-customs/button'
import { TypographySmall } from '../typography'

export const BackButton = () => {
    return (
        <CustomButton
            onClick={() => {
                window.history.back()
            }}
        >
            <ChevronLeft />
            <TypographySmall str={'Back'} />
        </CustomButton>
    )
}
