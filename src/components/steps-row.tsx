'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { intervalToDuration, minutesToSeconds } from 'date-fns'

import { cn, formatSeconds } from '@/lib/utils'

import { CustomCard } from '@/components/ui-customs/card'
import { StepVariants, stepVariants } from '@/constants'
import { CustomButton } from './ui-customs/button'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Clock9, PersonStanding } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import * as _ from 'lodash'
import { axiosInstance } from '@/lib/networking'

const FormSchema = z.object({
    population: z.number(),
    description: z.string(),
    timerMinutes: z.number(),
    timerSecondes: z.number(),
    variant: z.string(),
    position: z.number(),
})

export const StepsRow = ({
    step = {},
    edit = false,
    refetch,
    position,
    buildId,
}: any) => {
    const [loading, setLoading] = useState(false)

    const time = intervalToDuration({ start: 0, end: step.timer * 1000 })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            population: step?.population || 0,
            description: step?.description || '',
            timerMinutes: time?.minutes || 0,
            timerSecondes: time?.seconds || 0,
            variant: step?.variant || 'INFO',
            position: step?.position || 0,
        },
    })

    const variant = form.watch('variant')

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)

        const timer =
            minutesToSeconds(data.timerMinutes || 0) + (data.timerSecondes || 0)

        if (!_.isEmpty(step)) {
            await axiosInstance.patch(
                `step/${step.id}`,
                _.pick({ ...data, timer }, [
                    'description',
                    'population',
                    'timer',
                    'position',
                    'variant',
                ])
            )
        } else {
            await axiosInstance.post(`step`, {
                ..._.pick({ ...data, timer }, [
                    'description',
                    'population',
                    'timer',
                    'variant',
                ]),
                position: '' + position,
                buildId,
            })
            form.resetField('description')
        }
        setLoading(false)
        await refetch()
    }

    // useEffect(() => {
    //     if (Object.keys(form.formState.errors).length > 0) {
    //         console.error('Form Errors:', form.formState.errors)
    //     }
    // }, [form.formState.errors])

    return (
        <CustomCard
            className={cn(
                stepVariants({
                    variant:
                        StepVariants[variant as keyof typeof StepVariants] ||
                        StepVariants.INFO,
                }),
                'cursor-pointer'
            )}
        >
            {!edit && (
                <div className="flex items-center justify-between">
                    <div className="flex gap-3 w-28">
                        <p>{formatSeconds(step.timer)}</p>
                        <Clock9 />
                    </div>
                    <div className="flex gap-3 w-16">
                        {step.population}
                        <PersonStanding />
                    </div>
                    <p className="flex-1">{step.description}</p>
                </div>
            )}

            {edit && (
                <div className="flex gap-10 items-center">
                    {!_.isEmpty(step) && (
                        <p className="flex bg-black/50 rounded-full w-14 h-14 text-center justify-center items-center text-2xl text-white font-bold">
                            {step.position}
                        </p>
                    )}

                    <div className="flex flex-1 flex-col">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-5"
                            >
                                <div className="flex items-center justify-between gap-5 w-full">
                                    <FormField
                                        control={form.control}
                                        name="population"
                                        render={({ field }) => (
                                            <FormItem className="w-20">
                                                <FormLabel className="flex text-center justify-center">
                                                    Population
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-black/20 border-none focus-visible:ring-0"
                                                        placeholder="pop..."
                                                        {...field}
                                                        {...form.register(
                                                            'population',
                                                            {
                                                                valueAsNumber:
                                                                    true,
                                                            }
                                                        )}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-5">
                                        <FormField
                                            control={form.control}
                                            name="timerMinutes"
                                            render={({ field }) => (
                                                <FormItem className="w-20">
                                                    <FormLabel className="flex text-center justify-center">
                                                        Minutes
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-black/20 border-none focus-visible:ring-0"
                                                            placeholder="min..."
                                                            {...field}
                                                            {...form.register(
                                                                'timerMinutes',
                                                                {
                                                                    valueAsNumber:
                                                                        true,
                                                                }
                                                            )}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="timerSecondes"
                                            render={({ field }) => (
                                                <FormItem className="w-20">
                                                    <FormLabel className="flex text-center justify-center">
                                                        Seconds
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="bg-black/20 border-none focus-visible:ring-0"
                                                            placeholder="sec..."
                                                            {...field}
                                                            {...form.register(
                                                                'timerSecondes',
                                                                {
                                                                    valueAsNumber:
                                                                        true,
                                                                }
                                                            )}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="flex text-center justify-center">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="bg-black/20 border-none focus-visible:ring-0"
                                                        placeholder="description..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-end justify-center gap-x-16">
                                    <FormField
                                        control={form.control}
                                        name="variant"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormLabel className="flex text-center justify-center">
                                                        Variant
                                                    </FormLabel>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-black/20 border-none focus-visible:ring-0 flex items-end justify-center m-0">
                                                            <SelectValue placeholder="Variant" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent
                                                        className={cn(
                                                            stepVariants({
                                                                variant:
                                                                    StepVariants[
                                                                        variant as keyof typeof StepVariants
                                                                    ] ||
                                                                    StepVariants.INFO,
                                                            }),
                                                            'focus-visible:ring-0 border-black border-[1px]'
                                                        )}
                                                    >
                                                        {_.keys(
                                                            StepVariants
                                                        ).map(
                                                            (variant: any) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={`selectItem_variant_${variant}`}
                                                                        value={
                                                                            variant
                                                                        }
                                                                    >
                                                                        {_.capitalize(
                                                                            variant
                                                                        )}
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

                                    {!_.isEmpty(step) && (
                                        <div className="flex items-center justify-center gap-3">
                                            <CustomButton
                                                disabled={loading}
                                                className="bg-black/20 border-none focus-visible:ring-0 hover:bg-black/20"
                                                onClick={async () => {
                                                    setLoading(true)
                                                    await axiosInstance.patch(
                                                        `/step/move-position`,
                                                        {
                                                            id: '' + step?.id,
                                                            buildId:
                                                                '' +
                                                                step.buildId,
                                                            move: 'DOWN',
                                                        }
                                                    )

                                                    await refetch()
                                                    setLoading(false)
                                                }}
                                            >
                                                DOWN
                                            </CustomButton>
                                            <CustomButton
                                                disabled={loading}
                                                className="bg-black/20 border-none focus-visible:ring-0 hover:bg-black/20"
                                                onClick={async () => {
                                                    setLoading(true)
                                                    await axiosInstance.patch(
                                                        `/step/move-position`,
                                                        {
                                                            id: '' + step?.id,
                                                            buildId:
                                                                step.buildId,
                                                            move: 'UP',
                                                        }
                                                    )
                                                    await refetch()
                                                    setLoading(false)
                                                }}
                                            >
                                                UP
                                            </CustomButton>
                                            <CustomButton
                                                disabled={loading}
                                                className="bg-black/20 border-none focus-visible:ring-0 hover:bg-black/20"
                                                onClick={async () => {
                                                    setLoading(true)
                                                    await axiosInstance.delete(
                                                        `/step/${step?.id}`
                                                    )
                                                    await refetch()
                                                    setLoading(false)
                                                }}
                                            >
                                                DELETE
                                            </CustomButton>
                                        </div>
                                    )}

                                    <Button
                                        disabled={
                                            _.isEqual(
                                                _.pick(
                                                    {
                                                        population:
                                                            step?.population ||
                                                            0,
                                                        description:
                                                            step?.description ||
                                                            '',
                                                        timerMinutes:
                                                            time?.minutes || 0,
                                                        timerSecondes:
                                                            time?.seconds || 0,
                                                        variant:
                                                            step?.variant ||
                                                            'INFO',
                                                        position:
                                                            step?.position || 0,
                                                    },
                                                    [
                                                        'population',
                                                        'description',
                                                        'variant',
                                                        'timerSecondes',
                                                        'timerMinutes',
                                                    ]
                                                ),
                                                _.pick(form.getValues(), [
                                                    'population',
                                                    'description',
                                                    'variant',
                                                    'timerSecondes',
                                                    'timerMinutes',
                                                ])
                                            ) || loading
                                        }
                                        type="submit"
                                        variant={
                                            _.isEqual(
                                                _.pick(
                                                    {
                                                        population:
                                                            step?.population ||
                                                            0,
                                                        description:
                                                            step?.description ||
                                                            '',
                                                        timerMinutes:
                                                            time?.minutes || 0,
                                                        timerSecondes:
                                                            time?.seconds || 0,
                                                        variant:
                                                            step?.variant ||
                                                            'INFO',
                                                        position:
                                                            step?.position || 0,
                                                    },
                                                    [
                                                        'population',
                                                        'description',
                                                        'variant',
                                                        'timerSecondes',
                                                        'timerMinutes',
                                                    ]
                                                ),
                                                _.pick(form.getValues(), [
                                                    'population',
                                                    'description',
                                                    'variant',
                                                    'timerSecondes',
                                                    'timerMinutes',
                                                ])
                                            )
                                                ? 'ghost'
                                                : 'destructive'
                                        }
                                    >
                                        {!_.isEmpty(step) ? 'Save' : 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </CustomCard>
    )
}
