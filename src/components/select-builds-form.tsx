'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    PlayableRaces,
    RequestParameters,
    RequestParametersDefaultValues,
} from '@/constants/constants'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useEffect, useRef } from 'react'
import _ from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { objectToQueryString } from '@/lib/utils'
import { Input } from './ui/input'
import { Swords } from 'lucide-react'
import { CustomButton } from './ui-customs/button'

const FormSchema = z.object({
    [RequestParameters.race]: z.string(),
    [RequestParameters.v_race]: z.string(),
    [RequestParameters.query]: z.string(),
    [RequestParameters.page]: z.number(),
})

export function SelectBuildsForm({ defaultValues, totalItems }: any) {
    const router = useRouter()
    const pathname = usePathname()

    const refInputSearch = useRef<any>('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })

    const debouncedSearch = _.debounce((query) => {
        form.setValue(RequestParameters.query, query)
    }, 300)

    useEffect(() => {
        router.replace(`${pathname}${objectToQueryString(form.getValues())}`)
        defaultValues = form.getValues()
    }, [form.watch()])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(() => {})}
                className="flex items-center justify-between gap-3 z-10"
            >
                <div className="flex items-center gap-3">
                    {[RequestParameters.race, RequestParameters.v_race].map(
                        (item: any) => {
                            return (
                                <div
                                    className="flex items-center gap-3"
                                    key={`formField_${item}`}
                                >
                                    <FormField
                                        control={form.control}
                                        name={item}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-40">
                                                            <SelectValue
                                                                placeholder={
                                                                    item
                                                                }
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {_.keys(
                                                            PlayableRaces
                                                        ).map((race) => {
                                                            return (
                                                                <SelectItem
                                                                    key={`${item}_${race}`}
                                                                    value={race}
                                                                    className=""
                                                                >
                                                                    {_.capitalize(
                                                                        race
                                                                    )}
                                                                </SelectItem>
                                                            )
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    {item === RequestParameters.race && (
                                        <Swords className="text-muted-foreground" />
                                    )}
                                </div>
                            )
                        }
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <FormField
                        control={form.control}
                        name={RequestParameters.query}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Search..."
                                        name={field.name}
                                        ref={refInputSearch}
                                        defaultValue={defaultValues.query}
                                        onChange={(e) => {
                                            debouncedSearch(e.target.value)
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <CustomButton
                        disabled={_.isEqual(
                            defaultValues,
                            RequestParametersDefaultValues
                        )}
                        onClick={() => {
                            if (refInputSearch.current) {
                                refInputSearch.current.value = ''
                            }
                            form.reset(RequestParametersDefaultValues)
                        }}
                    >
                        Reset
                    </CustomButton>
                </div>
                <div className="flex gap-5 items-center">
                    <Button
                        variant={'outline'}
                        disabled={defaultValues?.page <= 1}
                        onClick={() => {
                            form.setValue(
                                RequestParameters.page,
                                defaultValues?.page > 1
                                    ? defaultValues?.page - 1
                                    : 1
                            )
                        }}
                    >
                        Prev
                    </Button>
                    <p className="tracking-widest">{`${defaultValues?.page}/${totalItems}`}</p>
                    <Button
                        variant={'outline'}
                        disabled={defaultValues?.page >= totalItems}
                        onClick={(e: any) => {
                            e.preventDefault()
                            form.setValue(
                                RequestParameters.page,
                                defaultValues?.page < totalItems
                                    ? defaultValues?.page + 1
                                    : totalItems
                            )
                        }}
                    >
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    )
}
