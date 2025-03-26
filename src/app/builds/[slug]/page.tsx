'use client'

import { useBuild } from '@/lib/queries'
import { extractUUID, getBadgeVariantFromLabel } from '@/lib/utils'
import { StepsRowContainer } from '@/components/steps-row-container'
import { TypographyH2 } from '../../../components/typography'
import { Badge } from '@/components/ui/badge'
import { useAuth, useStopwatch } from '@/components/providers/context-provider'
import * as _ from 'lodash'
import { useRouter } from 'next/navigation'
import { FileSliders, Star } from 'lucide-react'
import { CustomButton } from '@/components/ui-customs/button'
import { CloneBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/clone-build-button'
import { BackButton } from '@/components/buttons/back-button'
import { CustomCard } from '@/components/ui-customs/card'
import { axiosInstance } from '@/lib/networking'

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
                <div className="relative flex items-center justify-between gap-4 z-10">
                    <BackButton />
                    <div className="text-muted-foreground absolute left-1/2 -translate-x-1/2 bg-black border-none px-10 h-full flex items-center justify-center w-1/3">
                        <TypographyH2 str={build?.name} />
                    </div>

                    {!_.isEmpty(userId) && (
                        <div className="flex items-center gap-4">
                            {!_.some(userFavorites, { buildId: build.id }) && (
                                <CustomButton
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
                                </CustomButton>
                            )}

                            {_.some(userFavorites, { buildId: build.id }) && (
                                <CustomButton
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
                                    <Star />
                                    Remove from favorites
                                </CustomButton>
                            )}

                            {!_.some(userBuilds, { id: build.id }) && (
                                <CloneBuildButton
                                    build={build}
                                    userId={userId}
                                />
                            )}

                            {_.some(userBuilds, { id: build.id }) && (
                                <CustomButton
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/update/${build.slug}`
                                        )
                                    }
                                >
                                    <FileSliders />
                                    Edit
                                </CustomButton>
                            )}
                        </div>
                    )}
                </div>
            )}
            {!_.isEmpty(userId) && (
                <CustomCard className="flex flex-row justify-center items-center gap-10 hover:bg-black/80 rounded-2xl bg-black/80">
                    <div className="flex-1 flex justify-center text-5xl font-bold">
                        {formatTime()}
                    </div>
                    <div className="flex-1 flex justify-center gap-5">
                        <CustomButton onClick={start}>Start</CustomButton>
                        <CustomButton onClick={stop}>Stop</CustomButton>
                        <CustomButton onClick={reset}>Reset</CustomButton>
                    </div>
                </CustomCard>
            )}
            {!isRunning && (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-1 justify-center gap-5 items-center">
                        <Badge
                            className="p-2 text-lg justify-center w-1/3"
                            variant={getBadgeVariantFromLabel(build?.race?.[0])}
                        >{`${build.race}`}</Badge>
                        <p className="text-3xl font-semibold items-center">
                            vs
                        </p>
                        <Badge
                            className="p-2 text-lg justify-center w-1/3"
                            variant={getBadgeVariantFromLabel(
                                build?.v_race?.[0]
                            )}
                        >{`${build?.v_race}`}</Badge>
                    </div>
                    <CustomCard className="hover:bg-black">
                        {build?.description}
                    </CustomCard>
                </div>
            )}
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
