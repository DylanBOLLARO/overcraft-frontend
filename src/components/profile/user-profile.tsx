'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { User } from 'lucide-react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CustomCard } from '@/components/ui-customs/card'

// Form validation schema
const profileFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters.' })
        .max(30, { message: 'First name must not exceed 30 characters.' }),
    lastName: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' })
        .max(30, { message: 'Last name must not exceed 30 characters.' }),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters.' })
        .max(20, { message: 'Username must not exceed 20 characters.' })
        .regex(/^[a-z0-9_-]+$/, {
            message:
                'Username can only contain lowercase letters, numbers, underscores, and hyphens.',
        }),
    email: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' })
        .max(30, { message: 'Last name must not exceed 30 characters.' }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Mock user data - in a real app, this would come from your database
const defaultValues: ProfileFormValues = {
    firstName: 'Jean',
    lastName: 'Dupont',
    username: 'jean_dupont',
    email: 'jean_dupont@gmail.com',
}

export const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false)

    // Initialize form with react-hook-form
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    // Handle form submission
    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)

        try {
            // In a real app, you would send this data to your API
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

            toast('Profile updated successfully', {
                description: 'Your changes have been saved.',
                position: 'top-center',
                duration: 2000,
            })

            console.log({
                title: 'Profile updated',
                description:
                    'Your profile information has been updated successfully.',
            })
        } catch (error) {
            console.log({
                title: 'Something went wrong',
                description:
                    'Your profile could not be updated. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CustomCard className="hover:bg-black rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage
                            src="/placeholder.svg?height=80&width=80"
                            alt="Profile picture"
                        />
                        <AvatarFallback>
                            <User className="h-10 w-10" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">Profile</CardTitle>
                        <CardDescription>
                            Update your personal information
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-accent border-none"
                                                placeholder="Enter your first name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-accent border-none"
                                                placeholder="Enter your last name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-accent border-none"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name. It can
                                        only contain lowercase letters, numbers,
                                        underscores, and hyphens.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-accent border-none"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <CardFooter className="px-0 pt-6">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save changes'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </CustomCard>
    )
}
