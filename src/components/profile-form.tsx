'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { axiosInstance } from '@/lib/networking'
import { useAuth } from '@/components/providers/context-provider'
import { useRouter } from 'next/navigation'

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
    type: z.string({
        required_error: 'Please select a type.',
    }),
    difficulty: z.string({
        required_error: 'Please select a difficulty.',
    }),
    userId: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
    name: '',
    description: '',
    race: '',
    v_race: '',
    type: '',
    difficulty: '',
}

export function ProfileForm() {
    const { user } = useAuth()
    const router = useRouter()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { ...defaultValues, userId: user?.userinfo?.id || '' },
        mode: 'onChange',
    })

    async function onSubmit(data: ProfileFormValues) {
        const { slug } = (await axiosInstance.post('builds', data)).data
        if (slug) router.push(`/dashboard/update/${slug}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <div className="flex gap-5">
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
                                <FormDescription>
                                    You can manage email addresses in your{' '}
                                    <Link href="/examples/forms">
                                        email settings
                                    </Link>
                                    .
                                </FormDescription>
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
                                <FormDescription>
                                    You can manage email addresses in your{' '}
                                    <Link href="/examples/forms">
                                        email settings
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
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
                                        <SelectItem value="macro">
                                            macro
                                        </SelectItem>
                                        <SelectItem value="allin">
                                            allin
                                        </SelectItem>
                                        <SelectItem value="cheese">
                                            cheese
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can manage email addresses in your{' '}
                                    <Link href="/examples/forms">
                                        email settings
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a difficulty" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">0</SelectItem>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can manage email addresses in your{' '}
                                    <Link href="/examples/forms">
                                        email settings
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Create build</Button>
            </form>
        </Form>
    )
}
