import { cn } from '@/lib/utils'

export const BlurBackgroundColor = ({ position, className }: any) => {
    return (
        <div
            className={cn(
                'absolute w-40 h-40 bg-white blur-[250px]',
                position === 'left'
                    ? 'left-0 transform translate-y-1/2 translate-x-1/2'
                    : 'right-0 transform translate-y-1/2 -translate-x-1/2',
                className
            )}
        />
    )
}
