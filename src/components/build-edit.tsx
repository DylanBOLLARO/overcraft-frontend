'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { CustomButton } from './ui-customs/button'
import { useAuth } from './providers/context-provider'
import { useRouter } from 'next/navigation'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { axiosInstance } from '@/lib/networking'
import _ from 'lodash'
import { useState } from 'react'

const profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'name must be at least 2 characters.',
        })
        .max(30, {
            message: 'name must not be longer than 30 characters.',
        }),
    description: z.string().max(160).min(4),
    race: z.string({
        required_error: 'Please select an race.',
    }),
    v_race: z.string({
        required_error: 'Please select an vs race.',
    }),
    userId: z.string(),
    is_public: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    name: '',
    description: '',
    race: '',
    v_race: '',
    is_public: 'private',
}

export function BuildEdit({ build = {}, refetchBuild = () => {} }: any) {
    const { user, userRefetch } = useAuth()
    const router = useRouter()
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const [editOrUpdate] = useState(_.isEmpty(build) ? 'create' : 'update')

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            ...defaultValues,
            userId: user?.userinfo?.id || '',
            ...build,
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        const transformedData = {
            ...data,
            is_public: data.is_public === 'public' ? true : false,
        }

        if (editOrUpdate === 'create') {
            const { slug } = (
                await axiosInstance.post('builds', transformedData)
            ).data
            await userRefetch()
            if (slug) router.push(`/dashboard/update/${slug}`)
        } else {
            await axiosInstance.patch(`builds/${build?.id}`, transformedData)
            await refetchBuild()
            setIsDialogOpen(false)
        }
    }

    return (
        <Dialog
            onOpenChange={(e) => {
                setIsDialogOpen(e)
            }}
            open={isDialogOpen}
        >
            <DialogTrigger asChild>
                <Button>{_.capitalize(editOrUpdate)}</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-1 flex-col max-w-3xl bg-card">
                <DialogHeader>
                    <DialogTitle>
                        {_.capitalize(editOrUpdate)} a build order
                    </DialogTitle>
                    <DialogDescription>
                        {`Make changes to your build order here. Click save when
                        you're done.`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public build name. It can
                                        be changed later in the build properties
                                        in the edit menu.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe your build order.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {editOrUpdate === 'update' && (
                            <FormField
                                control={form.control}
                                name="is_public"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Privacy</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={
                                                defaultValues.is_public ===
                                                'true'
                                                    ? 'public'
                                                    : 'private'
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a privacy" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="public">
                                                    Public
                                                </SelectItem>
                                                <SelectItem value="private">
                                                    Private
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="flex gap-10">
                            <FormField
                                control={form.control}
                                name="race"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Race</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a race" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="TERRAN">
                                                    terran
                                                </SelectItem>
                                                <SelectItem value="ZERG">
                                                    zerg
                                                </SelectItem>
                                                <SelectItem value="PROTOSS">
                                                    protoss
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="v_race"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>vs Race</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a race" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="TERRAN">
                                                    terran
                                                </SelectItem>
                                                <SelectItem value="ZERG">
                                                    zerg
                                                </SelectItem>
                                                <SelectItem value="PROTOSS">
                                                    protoss
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
