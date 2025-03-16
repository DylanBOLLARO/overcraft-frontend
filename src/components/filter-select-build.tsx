import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    PlayableRaces,
    RequestParameters,
    RequestParametersDefaultValues,
} from '@/constants/constants'
import _ from 'lodash'
import { Swords } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { objectToQueryString } from '@/lib/utils'

export const FilterSelectBuild = ({
    searchFiltersBuildsProperties,
    setSearchFiltersBuildsProperties,
    builds,
}: any) => {
    const router = useRouter()
    const pathname = usePathname()

    const RequestParametersToDisplay = [
        RequestParameters.race,
        RequestParameters.v_race,
    ]

    const debouncedSearch = _.debounce((event) => {
        const newSelectedFilters = {
            ...searchFiltersBuildsProperties,
            [RequestParameters.query]: event.target.value,
            [RequestParameters.page]: 1,
        }
        router.replace(`${pathname}${objectToQueryString(newSelectedFilters)}`)
        setSearchFiltersBuildsProperties(newSelectedFilters)
    }, 500)

    return (
        <div className="flex items-center justify-between gap-3 h-10 z-10">
            <div className="flex items-center gap-3">
                {RequestParametersToDisplay.map((item: any) => {
                    return (
                        <div
                            key={`select_${item}`}
                            className="flex items-center gap-3"
                        >
                            <>
                                <Select
                                    onValueChange={(value) => {
                                        const newSelectedFilters = {
                                            ...searchFiltersBuildsProperties,
                                            page: 1,
                                            [item]: value,
                                        }
                                        router.replace(
                                            `${pathname}${objectToQueryString(
                                                newSelectedFilters
                                            )}`
                                        )
                                        setSearchFiltersBuildsProperties(
                                            newSelectedFilters
                                        )
                                    }}
                                    defaultValue={
                                        searchFiltersBuildsProperties[item]
                                    }
                                >
                                    <SelectTrigger className="w-40 border-none bg-black focus:ring-0">
                                        <SelectValue placeholder={item} />
                                    </SelectTrigger>
                                    <SelectContent className="border-none bg-black focus:ring-0">
                                        {_.keys(PlayableRaces).map((race) => {
                                            return (
                                                <SelectItem
                                                    key={`${item}_${race}`}
                                                    value={race}
                                                    className="border-none bg-black focus:ring-0"
                                                >
                                                    {_.capitalize(race)}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                {item === RequestParameters.race && (
                                    <Swords className="text-muted-foreground" />
                                )}
                            </>
                        </div>
                    )
                })}
            </div>
            <div className="flex gap-3 items-center h-full">
                <Input
                    className="border-none bg-black h-full min-w-72"
                    placeholder="Search"
                    onChange={(event) => {
                        debouncedSearch(event)
                    }}
                />
                <Button
                    disabled={_.isEqual(
                        searchFiltersBuildsProperties,
                        RequestParametersDefaultValues
                    )}
                    variant={
                        _.isEqual(
                            searchFiltersBuildsProperties,
                            RequestParametersDefaultValues
                        )
                            ? 'ghost'
                            : 'default'
                    }
                    onClick={() => {
                        router.replace(
                            pathname +
                                objectToQueryString(
                                    RequestParametersDefaultValues
                                )
                        )
                        setSearchFiltersBuildsProperties(
                            RequestParametersDefaultValues
                        )
                    }}
                >
                    reset
                </Button>
            </div>
            <div className="flex gap-3 items-center">
                <Button
                    variant={'outline'}
                    className="border-none bg-black"
                    disabled={searchFiltersBuildsProperties?.page <= 1}
                    onClick={() => {
                        const newSelectedFilters = {
                            ...searchFiltersBuildsProperties,
                            page:
                                searchFiltersBuildsProperties?.page > 1
                                    ? searchFiltersBuildsProperties?.page - 1
                                    : 1,
                        }
                        router.replace(
                            `${pathname}${objectToQueryString(
                                newSelectedFilters
                            )}`
                        )
                        setSearchFiltersBuildsProperties(newSelectedFilters)
                    }}
                >
                    Prev
                </Button>
                <p>{`${searchFiltersBuildsProperties?.page}/${Math.ceil(builds?.totalItems / builds?.take)}`}</p>
                <Button
                    variant={'outline'}
                    className="border-none bg-black"
                    disabled={
                        searchFiltersBuildsProperties?.page >=
                        Math.ceil(builds?.totalItems / builds?.take)
                    }
                    onClick={() => {
                        const newSelectedFilters = {
                            ...searchFiltersBuildsProperties,
                            page:
                                searchFiltersBuildsProperties?.page <
                                Math.ceil(builds?.totalItems / builds?.take)
                                    ? searchFiltersBuildsProperties?.page + 1
                                    : Math.ceil(
                                          builds?.totalItems / builds?.take
                                      ),
                        }
                        router.replace(
                            `${pathname}${objectToQueryString(
                                newSelectedFilters
                            )}`
                        )
                        setSearchFiltersBuildsProperties(newSelectedFilters)
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
