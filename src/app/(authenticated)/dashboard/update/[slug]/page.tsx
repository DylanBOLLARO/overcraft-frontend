'use client'

import { DialogDeleteBuild } from '@/components/DialogDeleteBuild'
import { DialogEditBuild } from '@/components/DialogEditBuild'
import { useAuth } from '@/components/providers/context-provider'
import { ExportBuildButton } from '@/components/buttons/transfer-builds-orders-buttons'
import { CloneBuildButton } from '@/components/buttons/transfer-builds-orders-buttons/clone-build-button'
import { TypographySmall } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { axiosInstance } from '@/lib/networking'
import { useBuild } from '@/lib/queries'
import {
    extractUUID,
    formatSeconds,
    getBadgeVariantFromLabel,
} from '@/lib/utils'
import { format } from 'date-fns'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from '@/components/buttons/back-button'
import { CustomButton } from '@/components/ui-customs/button'
import { CustomCard } from '@/components/ui-customs/card'
import { BuildEdit } from '@/components/build-edit'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const buildId: any = extractUUID(slug) || null

    const [description, setDescription] = useState<string>('')
    const [population, setPopulation] = useState<string>('')
    const [selectedMinute, setSelectedMinute] = useState<string>('')
    const [selectedSeconds, setSelectedSeconds] = useState<string>('')

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

    const handleAddButtonClick = async (
        description: any,
        population: any,
        selectedMinute: any,
        selectedSeconds: any,
        build: any
    ) => {
        if (description && population && selectedMinute && selectedSeconds) {
            await axiosInstance.post('step', {
                description,
                buildId,
                position: '' + build.steps.length,
                timer:
                    '' +
                    (parseInt(selectedMinute) * 60 + parseInt(selectedSeconds)),
                population,
            })
        }
    }

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
            </CustomCard>

            {build?.steps && (
                <CustomCard className="hover:bg-black">
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Population</TableHead>
                                    <TableHead>Timer</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {build?.steps.map(
                                    (step: any, index: number) => (
                                        <TableRow
                                            className="h-10"
                                            key={`${step?.id}`}
                                        >
                                            <TableCell>
                                                {step.population}
                                            </TableCell>
                                            <TableCell>
                                                {formatSeconds(step.timer || 0)}
                                            </TableCell>
                                            <TableCell>
                                                {step.description}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Toggle menu
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-black border-none"
                                                    >
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                await axiosInstance.patch(
                                                                    `/step/move-position`,
                                                                    {
                                                                        id:
                                                                            '' +
                                                                            step?.id,
                                                                        buildId:
                                                                            '' +
                                                                            build.id,
                                                                        move: 'DOWN',
                                                                    }
                                                                )
                                                                refetch()
                                                            }}
                                                        >
                                                            Move up
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                await axiosInstance.patch(
                                                                    `/step/move-position`,
                                                                    {
                                                                        id:
                                                                            '' +
                                                                            step?.id,
                                                                        buildId:
                                                                            '' +
                                                                            build.id,
                                                                        move: 'UP',
                                                                    }
                                                                )

                                                                refetch()
                                                            }}
                                                        >
                                                            Move down
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                await axiosInstance.delete(
                                                                    `/step/${
                                                                        step?.id
                                                                    }`
                                                                )
                                                                refetch()
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </CustomCard>
            )}

            <div className="flex flex-1 flex-row justify-between gap-3">
                <Input
                    className="h-8"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                    className="h-8 w-24"
                    placeholder="Population"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                />
                <div className="flex flex-row  gap-3">
                    <Input
                        className="h-8 w-24"
                        placeholder="Minutes"
                        value={selectedMinute}
                        onChange={(e) => setSelectedMinute(e.target.value)}
                    />
                    <Input
                        className="h-8 w-24"
                        placeholder="Secondes"
                        value={selectedSeconds}
                        onChange={(e) => setSelectedSeconds(e.target.value)}
                    />
                </div>

                <CustomButton
                    onClick={async () => {
                        await handleAddButtonClick(
                            description,
                            population,
                            selectedMinute,
                            selectedSeconds,
                            build
                        )
                        setDescription('')
                        setPopulation('')
                        setSelectedMinute('')
                        setSelectedSeconds('')
                        refetch()
                    }}
                    disabled={
                        !description ||
                        !population ||
                        !selectedMinute ||
                        !selectedSeconds
                    }
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add
                </CustomButton>
            </div>
        </div>
    )
}
