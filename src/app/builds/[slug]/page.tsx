'use client'

import { useBuild } from '@/lib/queries'
import { cn, extractUUID, getBadgeVariantFromLabel } from '@/lib/utils'
import { StepsRowContainer } from '@/components/steps-row-container'
import { TypographyH2 } from '../../../components/typography'
import { Badge } from '@/components/ui/badge'
import { useAuth, useStopwatch } from '@/components/providers/context-provider'
import * as _ from 'lodash'
import { useRouter } from 'next/navigation'
import { FileSliders, Star, StarOff } from 'lucide-react'
import { CustomButton } from '@/components/ui-customs/button'
import { CloneBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/clone-build-button'
import { BackButton } from '@/components/buttons/back-button'
import { CustomCard } from '@/components/ui-customs/card'
import { axiosInstance } from '@/lib/networking'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { DialogDeleteBuild } from '@/components/DialogDeleteBuild'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const { userId, userBuilds, userFavorites, userRefetch } = useAuth()
    const { isRunning, elapsedTime, formatTime, start, stop, reset } =
        useStopwatch()

    const router = useRouter()

    const buildId: any = extractUUID(slug) || null

    const { error, data: build, isLoading } = useBuild(buildId)

    if (isLoading) return

    if (error) return console.error('An error has occurred: ' + error.message)

    const currentIndex = build?.steps.findIndex(
        (step: any) => elapsedTime / 1000 < step.timer
    )

    const startIndex = Math.max(0, (currentIndex ?? 0) - 2)
    const endIndex = Math.min(build?.steps.length ?? 0, (currentIndex ?? 0) + 8)

    return (
        <div className="flex flex-col gap-y-5">
            {!isRunning && (
                <div className="relative flex items-center justify-between gap-5 z-10">
                    <BackButton />

                    {!_.isEmpty(userId) && (
                        <div className="flex items-center gap-4">
                            {!_.some(userFavorites, { buildId: build.id }) && (
                                <Button
                                    className="bg-red-950 hover:bg-red-950/90 text-foreground"
                                    onClick={async () => {
                                        await axiosInstance.post('favorites', {
                                            userId,
                                            buildId: build.id,
                                        })
                                        await userRefetch()
                                    }}
                                >
                                    <Star />
                                    Add favorites
                                </Button>
                            )}

                            {_.some(userFavorites, { buildId: build.id }) && (
                                <Button
                                    className="bg-card hover:bg-card/90 text-foreground"
                                    onClick={async () => {
                                        await axiosInstance.delete(
                                            `favorites/${
                                                _.find(userFavorites, {
                                                    buildId: build.id,
                                                }).id
                                            }`
                                        )
                                        await userRefetch()
                                    }}
                                >
                                    <StarOff />
                                    Remove from favorites
                                </Button>
                            )}

                            {!_.some(userBuilds, { id: build.id }) && (
                                <CloneBuildButton
                                    build={build}
                                    userId={userId}
                                />
                            )}

                            {_.some(userBuilds, { id: build.id }) && (
                                <Button
                                    className="bg-purple-950 hover:bg-purple-950/90 text-foreground"
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/update/${build.slug}`
                                        )
                                    }
                                >
                                    <FileSliders />
                                    Edit
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-3">
                <Card className="flex-1">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>
                                <h2 className="text-2xl">{build?.name}</h2>
                            </CardTitle>
                            <p className="text-sm font-normal text-foreground/50">
                                {format(new Date(build.created_at), 'dd/MM/yy')}
                            </p>
                        </div>
                        <CardDescription>{build?.description}</CardDescription>
                    </CardHeader>
                </Card>
                {!_.isEmpty(userId) && (
                    <Card className="flex-1 flex gap-3 items-center justify-center">
                        <div className="flex-1 flex justify-center text-5xl font-bold">
                            {formatTime()}
                        </div>
                        <div className="flex-1 flex justify-center gap-5">
                            <Button
                                variant={isRunning ? 'destructive' : 'dark'}
                                onClick={isRunning ? stop : start}
                                size={'lg'}
                            >
                                {isRunning ? 'Stop' : 'Start'}
                            </Button>
                            <Button
                                disabled={Math.floor(elapsedTime / 1000) === 0}
                                onClick={reset}
                                size={'lg'}
                            >
                                Reset
                            </Button>
                        </div>
                    </Card>
                )}
            </div>

            {/* {!isRunning && (
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5 items-center">
                        <Badge
                            className="p-2 text-lg justify-center"
                            variant={getBadgeVariantFromLabel(build?.race?.[0])}
                        >{`${build.race}`}</Badge>
                        <p className="text-3xl font-semibold items-center">
                            vs
                        </p>
                        <Badge
                            className="p-2 text-lg justify-center"
                            variant={getBadgeVariantFromLabel(
                                build?.v_race?.[0]
                            )}
                        >{`${build?.v_race}`}</Badge>
                    </div>
                </div>
            )} */}

            <StepsRowContainer
                steps={
                    isRunning
                        ? build?.steps?.slice(startIndex, endIndex)
                        : build?.steps
                }
                isRunning={isRunning}
                currentIndex={currentIndex}
            />
        </div>
    )
}
