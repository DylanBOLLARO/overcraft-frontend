'use client'

import { useBuild } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { extractUUID, getBadgeVariantFromLabel } from '@/lib/utils'
import { StepsRowContainer } from '@/components/steps-row-container'
import { TypographyH2, TypographySmall } from '../../../components/typography'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers/context-provider'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { ChevronLeft, FileSliders } from 'lucide-react'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const { user } = useAuth()
    const router = useRouter()

    const buildId: any = extractUUID(slug) || null

    const { error, data: build, isLoading } = useBuild(buildId)

    if (!buildId) return <></>

    if (isLoading) return
    if (error) return console.error('An error has occurred: ' + error.message)

    return (
        <div className="flex flex-col gap-y-5">
            <div className="relative flex items-center justify-between gap-4 h-10 z-10 ">
                <Button
                    variant="ghost"
                    className="h-full font-semibold px-10 bg-black border-none gap-5"
                    onClick={() => {
                        window.history.back()
                    }}
                >
                    <ChevronLeft />
                    <TypographySmall str={'Back'} />
                </Button>

                <div className="absolute left-1/2 -translate-x-1/2 bg-black border-none px-10 h-full flex items-center justify-center w-1/3">
                    <TypographyH2 str={build?.name} />
                </div>

                {!!user && user?.userinfo?.id == build?.userId && (
                    <Button
                        variant="ghost"
                        className="h-full font-semibold px-10 bg-black border-none gap-5"
                        onClick={() =>
                            router.push(`/dashboard/update/${build.slug}`)
                        }
                    >
                        <FileSliders />
                        Edit
                    </Button>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Card className="w-full bg-black border-none z-10">
                    <CardHeader>
                        <CardDescription className="text-base">
                            <div className="flex gap-3">
                                <div className="flex flex-1 justify-center gap-5 items-center">
                                    <Badge
                                        className="p-2 text-lg justify-center w-1/3"
                                        variant={getBadgeVariantFromLabel(
                                            build.race?.[0]
                                        )}
                                    >{`${build.race}`}</Badge>
                                    <p className="text-3xl font-semibold items-center">
                                        vs
                                    </p>
                                    <Badge
                                        className="p-2 text-lg justify-center w-1/3"
                                        variant={getBadgeVariantFromLabel(
                                            build.v_race?.[0]
                                        )}
                                    >{`${build.v_race}`}</Badge>
                                </div>
                            </div>
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className="w-full bg-black border-none z-10">
                    <CardHeader>
                        <CardDescription className="text-base">
                            {build?.description}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <StepsRowContainer steps={build?.steps} />
        </div>
    )
}
