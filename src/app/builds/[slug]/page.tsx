'use client'

import { useBuild } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { extractUUID, getBadgeVariantFromLabel } from '@/lib/utils'
import { BuildItem } from '@/components/build-item'
import { StepsRowContainer } from '@/components/steps-row-container'
import { TypographyH3 } from '../../../components/typography'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers/context-provider'
import _ from 'lodash'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const { user } = useAuth()
    const router = useRouter()

    const buildId: string | null = extractUUID(slug) || null

    if (!buildId) return <></>

    const { error, data: build, isLoading } = useBuild(buildId)

    if (isLoading) return
    if (error) return console.error('An error has occurred: ' + error.message)

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-between">
                <Button className="w-fit" onClick={() => window.history.back()}>
                    Back
                </Button>

                {!!user && user?.userinfo?.id == build?.userId && (
                    <Button
                        className="w-fit"
                        onClick={() =>
                            router.push(`/dashboard/update/${build.slug}`)
                        }
                    >
                        Edit
                    </Button>
                )}
            </div>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <p className="text-3xl font-semibold">{build?.name}</p>
                        <p className="text-sm font-normal text-muted-foreground">
                            {format(new Date(build.created_at), 'dd/MM/yy')}
                        </p>
                    </CardTitle>
                    <CardDescription className="text-base">
                        {build?.description}
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="flex gap-3">
                <Badge
                    variant={'outline'}
                    className="flex-1 p-2 w-full items-center justify-center text-xl"
                >
                    {build.type}
                </Badge>
                <div className="flex flex-1 justify-center gap-5 items-center">
                    <Badge
                        className="p-2 text-lg w-full justify-center"
                        variant={getBadgeVariantFromLabel(build.race?.[0])}
                    >{`${build.race}`}</Badge>
                    <p className="text-3xl font-semibold items-center">vs</p>
                    <Badge
                        className="p-2 text-lg w-full justify-center"
                        variant={getBadgeVariantFromLabel(build.v_race?.[0])}
                    >{`${build.v_race}`}</Badge>
                </div>
                <Badge
                    variant={'outline'}
                    className="flex-1 p-2 w-full items-center justify-center text-xl"
                >
                    {build.difficulty}
                </Badge>
            </div>
            <StepsRowContainer steps={build?.steps} />
        </div>
    )
}
