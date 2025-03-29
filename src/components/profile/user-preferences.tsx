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

// Form validation schema
const preferencesFormSchema = z.object({
    themeColor: z.string(),
    darkMode: z.boolean().default(false),
    language: z.string(),
    emailNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
    dataSharing: z.boolean().default(true),
    accentColor: z.string(),
})

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>

export const UserPreferences = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { setTheme, theme: nextTheme } = useTheme()

    // Mock user preferences data - in a real app, this would come from your database
    const defaultValues: PreferencesFormValues = {
        themeColor: '#3b82f6',
        darkMode: nextTheme == 'dark',
        language: 'fr',
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        dataSharing: true,
        accentColor: '#10b981',
    }

    // Initialize form with react-hook-form
    const form = useForm<PreferencesFormValues>({
        resolver: zodResolver(preferencesFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    // Handle form submission
    async function onSubmit(data: PreferencesFormValues) {
        setIsLoading(true)

        try {
            // In a real app, you would send this data to your API
            await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

            toast('Préférences mises à jour', {
                description:
                    'Vos préférences ont été enregistrées avec succès.',
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
                        <CardTitle className="text-2xl">Préférences</CardTitle>
                        <CardDescription>
                            Personnalisez votre expérience d'utilisation
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
                                    Apparence
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
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="themeColor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Couleur principale
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
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="w-28"
                                                    />
                                                </div>
                                                <FormDescription>
                                                    Choisissez la couleur
                                                    principale de l'interface
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="accentColor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Couleur d'accent
                                                </FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input
                                                            type="color"
                                                            {...field}
                                                            className="w-12 h-10 p-1 cursor-pointer"
                                                        />
                                                    </FormControl>
                                                    <Input
                                                        type="text"
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        className="w-28"
                                                    />
                                                </div>
                                                <FormDescription>
                                                    Choisissez la couleur
                                                    d'accent pour les boutons et
                                                    liens
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="darkMode"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">
                                                        Mode sombre
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Activer le mode sombre
                                                        pour l'interface
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
                                                    Notifications par email
                                                </FormLabel>
                                                <FormDescription>
                                                    Recevoir des notifications
                                                    par email concernant votre
                                                    compte
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
                                                    Notifications push
                                                </FormLabel>
                                                <FormDescription>
                                                    Recevoir des notifications
                                                    push sur votre appareil
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
                                                    Emails marketing
                                                </FormLabel>
                                                <FormDescription>
                                                    Recevoir des emails
                                                    concernant nos nouveaux
                                                    produits et offres
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                        <CardFooter className="px-0 pt-6">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save preferences'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
