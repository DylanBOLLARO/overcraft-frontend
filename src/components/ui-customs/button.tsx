import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '../ui/button'

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant={'ghost'}
                className={cn(
                    'flex h-9 font-semibold px-10 bg-black border-none gap-5 items-center cursor-pointer',
                    className
                )}
                {...props}
            />
        )
    }
)

CustomButton.displayName = 'CustomButton'

export { CustomButton }
