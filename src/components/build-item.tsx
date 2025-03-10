import { Badge } from '@/components/ui/badge'
import { format, formatDistanceToNowStrict } from 'date-fns'
import { Star, Swords } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { cn, getBadgeVariantFromLabel } from '@/lib/utils'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import _ from 'lodash'

export function BuildItem({ build, update }: any) {
    return (
        <Link
            className="flex-1 "
            href={
                !update
                    ? `/builds/${build.slug}`
                    : `/dashboard/update/${build.slug}`
            }
        >
            <Card className="flex flex-col p-4 gap-3 hover:bg-accent/75 duration-100 h-full">
                <CardHeader className="p-0">
                    <CardTitle>
                        <div className="flex">
                            {build.name}
                            <div
                                className={cn(
                                    'ml-auto text-xs text-muted-foreground'
                                )}
                            >
                                <p className="text-sm font-normal">
                                    {format(
                                        new Date(build.created_at),
                                        'dd/MM/yy'
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardTitle>

                    <CardDescription>
                        {build.description.substring(0, 300)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex items-center justify-between gap-2 w-full mt-auto">
                        <Badge
                            variant={getBadgeVariantFromLabel(build.race?.[0])}
                        >{`${build.race}`}</Badge>
                        <Swords className="opacity-75" />
                        <Badge
                            variant={getBadgeVariantFromLabel(
                                build.v_race?.[0]
                            )}
                        >{`${build.v_race}`}</Badge>

                        {build?.type && (
                            <>
                                <Separator orientation="vertical" />
                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
                                    {_.capitalize(build?.type) || undefined}
                                </h4>
                            </>
                        )}

                        {build?.difficulty && (
                            <>
                                <Separator orientation="vertical" />
                                <h4 className="scroll-m-20 text-lg font-semibold tracking-tight opacity-75">
                                    {build?.difficulty || 1}
                                </h4>
                                <Star
                                    strokeWidth={3}
                                    className="opacity-75 h-5 w-5 text-yellow-500"
                                />
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
