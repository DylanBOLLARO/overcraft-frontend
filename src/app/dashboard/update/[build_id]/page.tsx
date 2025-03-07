'use client'

import { BuildItem } from '@/components/build/build-item'
import { DialogDeleteBuild } from '@/components/DialogDeleteBuild'
import { DialogEditBuild } from '@/components/DialogEditBuild'
import ExportButton from '@/components/ExportButton'
import { Icons } from '@/components/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useBuild } from '@/lib/queries'
import {
    add_step_build,
    delete_step_in_build_steps,
    move_step_in_build_steps,
} from '@/lib/user'
import { cn, secondsToMinutesAndSeconds } from '@/lib/utils'
import { MoreHorizontal, PlusCircle, Table } from 'lucide-react'
import { useState } from 'react'

export default function Page({ params }: { params: { build_id: string } }) {
    const [description, setDescription] = useState<string>('')
    const [population, setPopulation] = useState<string>('')
    const [selectedMinute, setSelectedMinute] = useState<string>('')
    const [selectedSeconds, setSelectedSeconds] = useState<string>('')

    const { build_id } = params
    const {
        isLoading,
        error,
        data: build,
        refetch,
        isFetched,
    } = useBuild(build_id)

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
            await add_step_build({
                description,
                build_id: '' + build.id,
                position: '' + build.steps.length,
                timer:
                    '' +
                    (parseInt(selectedMinute) * 60 + parseInt(selectedSeconds)),
                population,
            })
        }
    }

    return (
        <div className="flex-1 flex flex-col gap-5 p-5">
            <div className="flex flex-row gap-5 justify-between">
                <Button
                    onClick={() => window.history.back()}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'left-4 top-4 md:left-8 md:top-8 self-start'
                    )}
                >
                    <>
                        <Icons.chevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </>
                </Button>

                <h4 className="scroll-m-20 text-3xl font-semibold">
                    {build?.title}
                </h4>

                <div className="flex flex-row gap-2">
                    <ExportButton selectedUserBuild={build} />
                    <DialogEditBuild refetch_build={refetch} build={build} />
                    <DialogDeleteBuild selectedUserBuildId={build?.id} />
                </div>
            </div>

            {isFetched && (
                <BuildItem
                    build={build}
                    classname={'hover:bg-transparent cursor-default'}
                    showHeader={false}
                    highlightCreator={true}
                />
            )}

            {build?.steps && (
                <Card className="bg-transparent">
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
                                                {secondsToMinutesAndSeconds(
                                                    step.timer || 0
                                                )}
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
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={async () => {
                                                                await move_step_in_build_steps(
                                                                    {
                                                                        id:
                                                                            '' +
                                                                            build
                                                                                ?.steps[
                                                                                index
                                                                            ]
                                                                                ?.id,
                                                                        build_id:
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
                                                                await move_step_in_build_steps(
                                                                    {
                                                                        id:
                                                                            '' +
                                                                            build
                                                                                ?.steps[
                                                                                index
                                                                            ]
                                                                                ?.id,
                                                                        build_id:
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
                                                                await delete_step_in_build_steps(
                                                                    build
                                                                        ?.steps[
                                                                        index
                                                                    ]?.id
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
                </Card>
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

                <Button
                    className="h-8"
                    variant="outline"
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
                </Button>
            </div>
        </div>
    )
}
