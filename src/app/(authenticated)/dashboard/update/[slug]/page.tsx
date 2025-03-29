'use client'

import { DialogDeleteBuild } from '@/components/DialogDeleteBuild'
import { useAuth } from '@/components/providers/context-provider'
import { ExportBuildButton } from '@/components/buttons/transfer-builds-orders-buttons'
import { CloneBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/clone-build-button'
import { TypographySmall } from '@/components/typography'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { axiosInstance } from '@/lib/networking'
import { useBuild } from '@/lib/queries'
import { cn, extractUUID } from '@/lib/utils'
import { format } from 'date-fns'
import { BackButton } from '@/components/buttons/back-button'

import { StepsRowContainer } from '@/components/steps-row-container'
import { StepsRow } from '@/components/steps-row'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronLeft, Save } from 'lucide-react'
import { BuildEdit } from '@/components/build-edit'
import { FormUpdateBuild } from '@/components/form-update-build'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    const buildId: any = extractUUID(slug) || null

    const {
        isLoading,
        error,
        data: build,
        refetch,
        isFetched,
    } = useBuild(buildId)

    const [editOrUpdate, setEditOrUpdate] = useState(
        _.isEmpty(build) ? 'create' : 'update'
    )

    const { userId } = useAuth()

    if (isLoading && !isFetched) return
    if (error) return console.error('An error has occurred: ' + error.message)

    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-between">
                <BackButton />

                <div className="flex gap-3">
                    <ExportBuildButton {...build} />
                    <CloneBuildButton build={build} userId={userId} />
                    <Button
                        className="bg-purple-950 hover:bg-purple-950/90 text-foreground"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft />
                        <TypographySmall str={'Leave edit mode'} />
                    </Button>
                </div>
            </div>

            <Card>
                <div className="flex justify-between">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>
                                <h2 className="text-2xl">{build?.name}</h2>
                            </CardTitle>
                        </div>
                        <CardDescription>{build?.description}</CardDescription>
                    </CardHeader>
                    <CardHeader>
                        <DialogDeleteBuild selectedUserBuildId={build?.id} />
                    </CardHeader>
                </div>

                <CardContent>
                    <FormUpdateBuild build={build} refetchBuild={refetch} />
                </CardContent>
            </Card>

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
