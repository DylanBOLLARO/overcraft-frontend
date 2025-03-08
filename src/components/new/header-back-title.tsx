import { Button, buttonVariants } from '../ui/button'
import { Icons } from '../icons'
import { ShareBuild } from './share-build'
import { capitalize } from '@/lib/utils'
import { cn } from '../../lib/utils'

export default function HeaderWithBackBtnAndTile({ config }: any) {
    return (
        <div className="flex flex-row justify-between relative">
            <Button
                onClick={() => window.history.back()}
                className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'left-4 top-4 md:left-8 md:top-8 self-start z-10'
                )}
            >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </>
            </Button>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h4 className="text-3xl font-semibold tracking-tight ">
                    {capitalize(config?.title)}
                </h4>
            </div>
        </div>
    )
}
