import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { TAB_SELECTION } from '@/constants/variable'
import _ from 'lodash'
import { Swords } from 'lucide-react'
import queryString from 'query-string'

export const FilterSelectBuild = ({
    filterSearchBuilds,
    setFilterSearchBuilds,
    defaultValueSearchFilterSearchBuilds,
}: any) => {
    return (
        <div className="flex items-center gap-4">
            <Select
                value={filterSearchBuilds.race}
                onValueChange={(event) => {
                    setFilterSearchBuilds((prev: any) => ({
                        ...prev,
                        race: event,
                    }))
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
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
            <Swords className="opacity-75" />
            <Select
                value={filterSearchBuilds.v_race}
                onValueChange={(event) => {
                    setFilterSearchBuilds((prev: any) => ({
                        ...prev,
                        v_race: event,
                    }))
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
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
                value={filterSearchBuilds.type}
                onValueChange={(event) => {
                    setFilterSearchBuilds((prev: any) => ({
                        ...prev,
                        type: event,
                    }))
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="macro">Macro</SelectItem>
                    <SelectItem value="cheese">Cheese</SelectItem>
                    <SelectItem value="allin">All-in</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filterSearchBuilds.difficulty}
                onValueChange={(event) => {
                    setFilterSearchBuilds((prev: any) => ({
                        ...prev,
                        difficulty: event,
                    }))
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Stars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="email"
                    placeholder="Search a build..."
                    onChange={(event) => {
                        setFilterSearchBuilds((prev: any) => ({
                            ...prev,
                            q: event.target.value,
                        }))
                    }}
                    value={filterSearchBuilds.q}
                />
            </div>

            {queryString.stringify(filterSearchBuilds) !==
                queryString.stringify(defaultValueSearchFilterSearchBuilds) && (
                <Button
                    className="relative"
                    variant={'default'}
                    onClick={() =>
                        setFilterSearchBuilds(
                            defaultValueSearchFilterSearchBuilds
                        )
                    }
                >
                    Reset
                </Button>
            )}
        </div>
    )
}
