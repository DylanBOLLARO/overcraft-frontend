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
import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: 'name must be at least 2 characters.',
    }),
    description: z.string().max(160).min(4),
    race: z.string({
        required_error: 'Please select an race.',
    }),
    v_race: z.string({
        required_error: 'Please select an vs race.',
    }),
    userId: z.string(),
    is_public: z.boolean(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    name: 'name',
    description: 'description',
    race: '',
    v_race: '',
    is_public: false,
}
export const FormUpdateBuild = ({
    build = {},
    refetchBuild = () => {},
}: any) => {
    const { userRefetch } = useAuth()
    const router = useRouter()

    const [editOrUpdate] = useState(_.isEmpty(build) ? 'create' : 'update')
    const [sameProperties, isSameProperties] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            ...defaultValues,
            ...build,
        },
    })

    async function onSubmitCreate(data: ProfileFormValues) {
        const transformedData = {
            ...data,
        }
        const { slug } = (await axiosInstance.post('builds', transformedData))
            .data
        await userRefetch()
        if (slug) router.push(`/dashboard/update/${slug}`)
    }

    async function onSubmitUpdate(data: ProfileFormValues) {
        const transformedData = {
            ...data,
        }

        await axiosInstance.patch(`builds/${build?.id}`, transformedData)
        await refetchBuild()
    }

    useEffect(() => {
        const propertiesToCompare = [
            'description',
            'name',
            'is_public',
            'race',
            'v_race',
        ]

        const formProperties = _.pick(form.getValues(), propertiesToCompare)
        const buildProperties = _.pick(build, propertiesToCompare)

        isSameProperties(_.isEqual(formProperties, buildProperties))
    }, [form.watch()])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    editOrUpdate === 'create' ? onSubmitCreate : onSubmitUpdate
                )}
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
                                This is your public build name. It can be
                                changed later in the build properties in the
                                edit menu.
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
                                <Textarea className="resize-none" {...field} />
                            </FormControl>
                            <FormDescription>
                                Describe your build order.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-10">
                    {editOrUpdate === 'update' && (
                        <FormField
                            control={form.control}
                            name="is_public"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1">
                                        <FormLabel>Privacy</FormLabel>
                                        <FormDescription>
                                            Public (this build will be visible
                                            to all users)
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="race"
                        render={({ field }) => (
                            <FormItem className="min-w-40">
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
                                        {['terran', 'zerg', 'protoss'].map(
                                            (race) => {
                                                return (
                                                    <SelectItem
                                                        key={`race_${race}`}
                                                        value={race.toUpperCase()}
                                                    >
                                                        {_.capitalize(race)}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
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
                            <FormItem className="min-w-40">
                                <FormLabel>Versus</FormLabel>
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
                                        {['terran', 'zerg', 'protoss'].map(
                                            (race) => {
                                                return (
                                                    <SelectItem
                                                        key={`versus_${race}`}
                                                        value={race.toUpperCase()}
                                                    >
                                                        {_.capitalize(race)}
                                                    </SelectItem>
                                                )
                                            }
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    disabled={sameProperties}
                    className="flex ml-auto gap-3"
                    type="submit"
                    size={'lg'}
                    variant={sameProperties ? 'default' : 'destructive'}
                >
                    <Save />
                    Save changes
                </Button>
            </form>
        </Form>
    )
}
