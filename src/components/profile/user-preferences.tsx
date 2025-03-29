'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Settings } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import _ from 'lodash'
import { StepVariants } from '@/constants'
import { useAuth } from '../providers/context-provider'
import { axiosInstance } from '@/lib/networking'

// Form validation schema
const preferencesFormSchema = z.object({
    darkMode: z.boolean().default(false),
})

export const UserPreferences = () => {
    const { user, userId, userRefetch } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const { setTheme, theme: nextTheme } = useTheme()

    function getRandomDarkColor() {
        let color = Math.floor(Math.random() * 16777215).toString(16)

        color = '#' + ('000000' + color).slice(-6)

        let r = parseInt(color.slice(1, 3), 16)
        let g = parseInt(color.slice(3, 5), 16)
        let b = parseInt(color.slice(5, 7), 16)

        r = Math.floor(r * 0.5)
        g = Math.floor(g * 0.5)
        b = Math.floor(b * 0.5)

        return (
            '#' +
            r.toString(16).padStart(2, '0') +
            g.toString(16).padStart(2, '0') +
            b.toString(16).padStart(2, '0')
        )
    }

    const defaultValues: any = {
        darkMode: nextTheme == 'dark',
        ...(!_.isNil(user?.userinfo?.colorPreferences)
            ? user?.userinfo?.colorPreferences
            : {}),
    }

    // Initialize form with react-hook-form
    const form = useForm<any>({
        resolver: zodResolver(preferencesFormSchema),
        defaultValues,
    })

    // Handle form submission
    async function onSubmit(data: any) {
        setIsLoading(true)
        try {
            await axiosInstance.patch(
                `user/${userId}`,
                _.omit(form.getValues(), ['darkMode'])
            )
            await userRefetch()
            toast('Preferences updated', {
                description: 'Your preferences have been successfully saved.',
                position: 'top-center',
                duration: 2000,
            })
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center text-primary-foreground bg-accent-foreground">
                        <Settings className="h-10 w-10" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">Preferences</CardTitle>
                        <CardDescription>
                            Customize your user experience
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <Tabs defaultValue="appearance" className="w-full">
                            <TabsList className="flex w-full">
                                <TabsTrigger
                                    value="appearance"
                                    className="flex-1"
                                >
                                    Appearance
                                </TabsTrigger>
                                <TabsTrigger
                                    value="notifications"
                                    className="flex-1"
                                >
                                    Notifications
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent
                                value="appearance"
                                className="space-y-6 pt-4"
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-wrap gap-5">
                                        {_.keys(StepVariants).map((color) => {
                                            return (
                                                <FormField
                                                    key={`${color.toLowerCase()}_color`}
                                                    control={form.control}
                                                    name={`${color.toLowerCase()}_color`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                {_.capitalize(
                                                                    color
                                                                )}{' '}
                                                                Color
                                                            </FormLabel>
                                                            <div className="flex items-center gap-2">
                                                                <FormControl>
                                                                    <Input
                                                                        className="w-12 h-10 p-1 cursor-pointer"
                                                                        type="color"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <Input
                                                                    type="text"
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                    className="w-28"
                                                                />
                                                            </div>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        })}
                                    </div>

                                    <div className="flex gap-5">
                                        <Button
                                            variant={'secondary'}
                                            className="flex-1"
                                            onClick={() => {
                                                const colorsItems = _.keys(
                                                    StepVariants
                                                ).reduce<
                                                    Record<string, string>
                                                >(
                                                    (acc, curr) => {
                                                        if (!_.has(acc, curr)) {
                                                            acc[
                                                                `${curr.toLowerCase()}_color`
                                                            ] =
                                                                getRandomDarkColor()
                                                        }
                                                        return acc
                                                    },
                                                    {} as Record<string, string>
                                                )

                                                form.reset(colorsItems)
                                            }}
                                            type="button"
                                        >
                                            Generate a random color palette
                                        </Button>
                                        <Button
                                            variant={'secondary'}
                                            className="flex-1"
                                            onClick={() => {
                                                const colorsItems = _.keys(
                                                    StepVariants
                                                ).reduce<
                                                    Record<string, string>
                                                >(
                                                    (acc, curr) => {
                                                        if (!_.has(acc, curr)) {
                                                            acc[
                                                                `${curr.toLowerCase()}_color`
                                                            ] = ''
                                                        }
                                                        return acc
                                                    },
                                                    {} as Record<string, string>
                                                )

                                                form.reset(colorsItems)
                                            }}
                                            type="button"
                                        >
                                            Use default color palette
                                        </Button>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="darkMode"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Dark Mode
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Enable dark mode for the
                                                        interface
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={
                                                            nextTheme == 'dark'
                                                        }
                                                        onCheckedChange={(e) =>
                                                            setTheme(
                                                                e
                                                                    ? 'dark'
                                                                    : 'light'
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent
                                value="notifications"
                                className="space-y-6 pt-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="emailNotifications"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Email Notifications
                                                </FormLabel>
                                                <FormDescription>
                                                    Receive email notifications
                                                    about your account
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="pushNotifications"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Push Notifications
                                                </FormLabel>
                                                <FormDescription>
                                                    Receive push notifications
                                                    on your device
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="marketingEmails"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-base">
                                                    Marketing Emails
                                                </FormLabel>
                                                <FormDescription>
                                                    Receive emails about our new
                                                    products and offers
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                        <CardFooter className="px-0 pt-6">
                            <Button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    _.isEqual(
                                        _.omit(form.getValues(), ['darkMode']),
                                        _.omit(
                                            user?.userinfo?.colorPreferences,
                                            ['darkMode']
                                        )
                                    )
                                }
                            >
                                {isLoading ? 'Saving...' : 'Save preferences'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
