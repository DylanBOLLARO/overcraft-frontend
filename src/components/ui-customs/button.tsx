import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const CustomButton: any = ({ children, ...props }: any) => {
    return (
        <Button
            variant={'ghost'}
            {...props}
            className={cn(
                'flex h-9 font-semibold px-10 bg-black border-none gap-5 items-center',
                props.className
            )}
        >
            {children}
        </Button>
    )
}
