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
    DEFAULT_VALUES_SEARCH_FILTERS_BUILDS_PROPERTIES,
    TAB_SELECTION,
} from '@/constants/constants'
import _ from 'lodash'
import { Swords } from 'lucide-react'
import { useSearch } from './providers/context-provider'

export const FilterSelectBuild = () => {
    const {
        searchFiltersBuildsProperties,
        setSearchFiltersBuildsProperties,
        builds,
        isLoading,
        error,
        isFetched,
    } = useSearch()

    return (
        <div className="flex items-center gap-4 h-12 z-10">
            <Select
                value={searchFiltersBuildsProperties.race}
                onValueChange={(event) => {
                    setSearchFiltersBuildsProperties((prev: any) => ({
                        ...prev,
                        race: event,
                    }))
                }}
            >
                <SelectTrigger className="border-none bg-black h-full w-32">
                    <SelectValue
                        placeholder="All"
                        className="border-none bg-black"
                    />
                </SelectTrigger>
                <SelectContent className="border-none bg-black">
                    {TAB_SELECTION.map((tabsValue: string) => {
                        return (
                            <SelectItem
                                key={`race_${tabsValue}`}
                                value={tabsValue}
                            >
                                {_.capitalize(tabsValue)}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            <Swords />
            <Select
                value={searchFiltersBuildsProperties.v_race}
                onValueChange={(event) => {
                    setSearchFiltersBuildsProperties((prev: any) => ({
                        ...prev,
                        v_race: event,
                    }))
                }}
            >
                <SelectTrigger className="border-none bg-black h-full w-32">
                    <SelectValue
                        placeholder="All"
                        className="border-none bg-black"
                    />
                </SelectTrigger>
                <SelectContent className="border-none bg-black">
                    {TAB_SELECTION.map((tabsValue: string) => {
                        return (
                            <SelectItem
                                key={`v_race_${tabsValue}`}
                                value={tabsValue}
                            >
                                {_.capitalize(tabsValue)}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>

            <Select
                value={searchFiltersBuildsProperties.type}
                onValueChange={(event) => {
                    setSearchFiltersBuildsProperties((prev: any) => ({
                        ...prev,
                        type: event,
                    }))
                }}
            >
                <SelectTrigger className="border-none bg-black h-full w-32">
                    <SelectValue
                        placeholder="All Types"
                        className="border-none bg-black"
                    />
                </SelectTrigger>
                <SelectContent className="border-none bg-black">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="macro">Macro</SelectItem>
                    <SelectItem value="cheese">Cheese</SelectItem>
                    <SelectItem value="allin">All-in</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={searchFiltersBuildsProperties.difficulty}
                onValueChange={(event) => {
                    setSearchFiltersBuildsProperties((prev: any) => ({
                        ...prev,
                        difficulty: event,
                    }))
                }}
            >
                <SelectTrigger className="border-none bg-black h-full w-32">
                    <SelectValue
                        placeholder="All Stars"
                        className="border-none bg-black"
                    />
                </SelectTrigger>
                <SelectContent className="border-none bg-black">
                    <SelectItem value="all">All Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                </SelectContent>
            </Select>

            <Input
                className="border-none bg-black h-full w-fit min-w-96"
                type="email"
                placeholder="Search"
                onChange={(event) => {
                    setSearchFiltersBuildsProperties((prev: any) => ({
                        ...prev,
                        q: event.target.value,
                    }))
                }}
                value={searchFiltersBuildsProperties.q}
            />

            <Button
                disabled={_.isEqual(
                    searchFiltersBuildsProperties,
                    DEFAULT_VALUES_SEARCH_FILTERS_BUILDS_PROPERTIES
                )}
                className="h-full px-10 border-none bg-black"
                variant={'outline'}
                onClick={() =>
                    setSearchFiltersBuildsProperties(
                        DEFAULT_VALUES_SEARCH_FILTERS_BUILDS_PROPERTIES
                    )
                }
            >
                Reset
            </Button>
        </div>
    )
}
