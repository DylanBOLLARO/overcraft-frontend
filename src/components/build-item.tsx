import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Swords } from 'lucide-react'
import { cn, getBadgeVariantFromLabel } from '@/lib/utils'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import * as _ from 'lodash'
import { useAuth } from './providers/context-provider'
import { CustomCard } from './ui-customs/card'
import { BorderTrail } from './ui/border-trail'

export function BuildItem({ build, update }: any) {
    const { userBuilds, userFavorites } = useAuth()

    return (
        <Link
            className="z-10 "
            href={
                !update
                    ? `/builds/${build.slug}`
                    : `/dashboard/update/${build.slug}`
            }
        >
            <CustomCard className="relative overflow-hidden rounded-md border outline-hidden ">
                {_.some(userFavorites, { buildId: build.id }) && (
                    <BorderTrail
                        size={80}
                        className="bg-linear-to-l from-pink-200 via-purple-500 to-pink-200 dark:from-indigo-400 dark:via-purple-600 dark:to-pink-900"
                    />
                )}
                {_.some(userBuilds, { id: build.id }) && (
                    <BorderTrail
                        size={80}
                        className="bg-linear-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-600 dark:to-blue-900"
                    />
                )}

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
                                        new Date(build?.created_at),
                                        'dd/MM/yy'
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                        {build.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex items-center justify-between gap-2 mt-auto w-fit">
                        <Badge
                            variant={getBadgeVariantFromLabel(build.race?.[0])}
                        >{`${build.race}`}</Badge>
                        <Swords className="opacity-75" />
                        <Badge
                            variant={getBadgeVariantFromLabel(
                                build.v_race?.[0]
                            )}
                        >{`${build.v_race}`}</Badge>
                    </div>
                </CardContent>
            </CustomCard>
        </Link>
    )
}
