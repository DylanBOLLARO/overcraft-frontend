import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Swords } from 'lucide-react'
import { cn, getBadgeVariantFromLabel } from '@/lib/utils'
import {
    Card,
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
            <Card className="relative overflow-hidden rounded-md border outline-hidden rounded border text-card-foreground shadow-sm flex flex-col p-4 gap-3 duration-100 h-full">
                {_.some(userFavorites, { buildId: build.id }) && (
                    <BorderTrail
                        transition={{ delay: 0 }}
                        size={80}
                        className="z-10 bg-linear-to-l from-purple-200 via-purple-500 to-purple-200 dark:from-purple-400 dark:via-purple-600 dark:to-purple-900 blur-xl"
                    />
                )}

                {_.some(userBuilds, { id: build.id }) && (
                    <BorderTrail
                        size={80}
                        transition={{ delay: 0.5 }}
                        className={cn(
                            'bg-linear-to-l from-blue-300 via-blue-500 to-blue-300 dark:from-blue-700/30 dark:via-blue-500 dark:to-blue-700/30 blur-xl'
                        )}
                    />
                )}

                {build?.featured && (
                    <BorderTrail
                        size={80}
                        transition={{ delay: 1 }}
                        className={cn(
                            'bg-linear-to-l from-green-300 via-green-500 to-green-300 dark:from-green-700/30 dark:via-green-500 dark:to-green-700/30 blur-xl'
                        )}
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
            </Card>
        </Link>
    )
}
