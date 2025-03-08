'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/components/ui/table'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

import { useState } from 'react'
import {
    add_step_build,
    delete_step_in_build_steps,
    move_step_in_build_steps,
} from '../lib/user'

export function DataTable({
    columns,
    selectedUserBuild,
    local_refresh_steps,
}: any) {
    const table = useReactTable({
        data: selectedUserBuild.steps,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [description, setDescription] = useState<string>('')
    const [population, setPopulation] = useState<string>('')
    const [timer, setTimer] = useState<string>('')

    const handleAddButtonClick = async () => {
        if (description && population && timer) {
            await add_step_build({
                description,
                build_id: '' + selectedUserBuild.id,
                position: '' + selectedUserBuild.steps.length,
                timer: '' + timer,
                population,
            })
        }
    }

    return (
        <>
            <div className="rounded-md border animate-fade animate-once animate-duration-300">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                                <TableHead>Options</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 &&
                            table.getRowModel().rows.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell className="flex flex-row gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 px-0"
                                            onClick={async () => {
                                                await move_step_in_build_steps({
                                                    id: '' + row.original.id,
                                                    build_id:
                                                        '' +
                                                        selectedUserBuild.id,
                                                    move: 'DOWN',
                                                })
                                                await local_refresh_steps()
                                            }}
                                        >
                                            <ChevronUp className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 px-0"
                                            onClick={async () => {
                                                await move_step_in_build_steps({
                                                    id: '' + row.original.id,
                                                    build_id:
                                                        '' +
                                                        selectedUserBuild.id,
                                                    move: 'UP',
                                                })
                                                await local_refresh_steps()
                                            }}
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 px-0 hover:text-destructive"
                                            onClick={async () => {
                                                await delete_step_in_build_steps(
                                                    row.original.id
                                                )
                                                await local_refresh_steps()
                                            }}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
