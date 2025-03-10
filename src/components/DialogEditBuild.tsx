'use client'

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { ClipboardEdit, Star } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import queryString from 'query-string'
import _ from 'lodash'
import { axiosInstance } from '@/lib/networking'
import { TypographySmall } from './typography'

export const DialogEditBuild = ({ build, refetch_build }: any) => {
    const [open, setOpen] = useState(false)

    const extractKeyUpdateBuild = (build: any) => {
        const {
            id,
            name,
            description,
            race,
            is_public,
            v_race,
            difficulty,
            type,
        } = build
        return {
            id,
            name,
            description,
            race,
            is_public,
            v_race,
            difficulty,
            type,
        }
    }

    const defaultBuild = extractKeyUpdateBuild(build)
    const [editedBuild, setEditedBuild] = useState({ ...defaultBuild })

    useEffect(() => {
        setEditedBuild((prev) => ({
            ...prev,
            ...extractKeyUpdateBuild(build),
        }))
    }, [build])

    const handleSaveChanges = async () => {
        await axiosInstance.patch(`build/${editedBuild.id}`, editedBuild)
        refetch_build()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <ClipboardEdit className="h-4 w-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="hidden"></DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="email">Name</Label>
                        <Input
                            type="email"
                            id="email"
                            defaultValue={editedBuild?.name}
                            onChange={(event) => {
                                setEditedBuild((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                }))
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            autoFocus={false}
                            id="description"
                            className="h-20"
                            defaultValue={editedBuild?.description}
                            onChange={(event) => {
                                setEditedBuild((prev) => ({
                                    ...prev,
                                    description: event.target.value,
                                }))
                            }}
                        />
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col gap-2 items-center flex-1">
                            <p>Play race</p>
                            <Select
                                value={editedBuild.race}
                                onValueChange={(event) => {
                                    setEditedBuild((prev) => ({
                                        ...prev,
                                        race: event,
                                    }))
                                }}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder={build.race} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ZERG">ZERG</SelectItem>
                                    <SelectItem value="TERRAN">
                                        TERRAN
                                    </SelectItem>
                                    <SelectItem value="PROTOSS">
                                        PROTOSS
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col flex-1 gap-2 items-center">
                            <p>Opponent race</p>
                            <Select
                                value={editedBuild.v_race}
                                onValueChange={(event) => {
                                    setEditedBuild((prev) => ({
                                        ...prev,
                                        v_race: event,
                                    }))
                                }}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder={build.v_race} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ZERG">ZERG</SelectItem>
                                    <SelectItem value="TERRAN">
                                        TERRAN
                                    </SelectItem>
                                    <SelectItem value="PROTOSS">
                                        PROTOSS
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center px-1">
                        <div className="flex flex-col gap-2 items-center flex-1">
                            <p>Privacy</p>
                            <Select
                                value={
                                    editedBuild.is_public === true
                                        ? 'public'
                                        : 'private'
                                }
                                onValueChange={(event) => {
                                    setEditedBuild((prev) => ({
                                        ...prev,
                                        is_public: event === 'public',
                                    }))
                                }}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue
                                        placeholder={
                                            editedBuild.is_public === 'public'
                                                ? 'Public'
                                                : 'Private'
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">
                                        Public
                                    </SelectItem>
                                    <SelectItem value="private">
                                        Private
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col gap-2 items-center flex-1">
                            <p>Type</p>

                            <Select
                                value={'' + editedBuild.type}
                                onValueChange={(event) => {
                                    setEditedBuild((prev) => ({
                                        ...prev,
                                        type: event,
                                    }))
                                }}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue
                                        placeholder={editedBuild.type}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="macro">Macro</SelectItem>
                                    <SelectItem value="cheese">
                                        Cheese
                                    </SelectItem>
                                    <SelectItem value="allin">Allin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2 items-center flex-1">
                            <p>Difficulty</p>
                            <Select
                                value={'' + editedBuild.difficulty}
                                onValueChange={(event) => {
                                    setEditedBuild((prev) => ({
                                        ...prev,
                                        difficulty: parseInt(event),
                                    }))
                                }}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue
                                        placeholder={editedBuild.difficulty}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">
                                        <div className="flex flew-row gap-2">
                                            <Star />
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="2">
                                        <div className="flex flew-row gap-2">
                                            <Star />
                                            <Star />
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="3">
                                        <div className="flex flew-row gap-2">
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    {!_.isEqual(editedBuild, defaultBuild) && (
                        <Button
                            variant={'outline'}
                            className="h-auto font-semibold w-fit"
                            onClick={() => {
                                handleSaveChanges()
                                setOpen(false)
                            }}
                        >
                            <TypographySmall str={'Save changes'} />
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
