'use client'

import { DialogDeleteBuild } from '@/components/DialogDeleteBuild'
import { useAuth } from '@/components/providers/context-provider'
import { ExportBuildButton } from '@/components/buttons/transfer-builds-orders-buttons'
import { CloneBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/clone-build-button'
import { TypographySmall } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { axiosInstance } from '@/lib/networking'
import { useBuild } from '@/lib/queries'
import { extractUUID, getBadgeVariantFromLabel } from '@/lib/utils'
import { format } from 'date-fns'
import { BackButton } from '@/components/buttons/back-button'
import { CustomButton } from '@/components/ui-customs/button'
import { CustomCard } from '@/components/ui-customs/card'
import { BuildEdit } from '@/components/build-edit'
import { StepsRowContainer } from '@/components/steps-row-container'
import { StepsRow } from '@/components/steps-row'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const buildId: any = extractUUID(slug) || null

    const { userId } = useAuth()
    const {
        isLoading,
        error,
        data: build,
        refetch,
        isFetched,
    } = useBuild(buildId)

    if (isLoading && !isFetched) return
    if (error) return console.error('An error has occurred: ' + error.message)

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-between">
                <BackButton />

                <div className="flex gap-3">
                    <ExportBuildButton {...build} />
                    <CloneBuildButton build={build} userId={userId} />
                    <BuildEdit build={build} refetchBuild={refetch} />
                    <DialogDeleteBuild selectedUserBuildId={build?.id} />
                    <CustomButton onClick={() => window.history.back()}>
                        <TypographySmall str={'Leave edit mode'} />
                    </CustomButton>
                </div>
            </div>

            <CustomCard className="hover:bg-black">
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
            </CustomCard>

            <CustomCard className="hover:bg-black">
                <CardHeader>
                    <CardDescription className="text-base">
                        <div className="flex gap-3">
                            <div className="flex flex-1 justify-center gap-5 items-center">
                                <Badge
                                    className="p-2 text-lg justify-center w-1/3"
                                    variant={getBadgeVariantFromLabel(
                                        build?.race?.[0]
                                    )}
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
                        </div>
                    </CardDescription>
                </CardHeader>
            </CustomCard>

            {build?.steps && (
                <StepsRowContainer
                    steps={build?.steps}
                    edit={true}
                    refetch={refetch}
                />
            )}

            <StepsRow
                edit={true}
                position={build?.steps.length}
                buildId={buildId}
                refetch={refetch}
            />
        </div>
    )
}
