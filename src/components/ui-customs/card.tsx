import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'

const CustomCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded border text-card-foreground shadow-sm flex flex-col p-4 gap-3 duration-100 h-full bg-black hover:bg-accent border-transparent',
            className
        )}
        {...props}
    />
))
CustomCard.displayName = 'CustomCard'

export { CustomCard }
