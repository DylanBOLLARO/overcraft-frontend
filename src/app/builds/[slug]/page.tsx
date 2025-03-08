'use client'

import { BuildItem } from '@/components/build/build-item'
import HeaderWithBackBtnAndTile from '@/components/new/header-back-title'
import { NoResultsFound } from '@/components/new/no-builds-found'
import { Card, CardContent } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useBuild } from '@/lib/queries'
import { extractUUID, secondsToMinutesAndSeconds } from '@/lib/utils'

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const buildId = extractUUID(slug)

    const {
        error,
        data: build,
        isLoading,
        isFetched,
        refetch,
    } = useBuild(buildId)
    console.log(build)
    // useEffect(() => {
    //     // Create a scoped async function in the hook
    //     async function runAsync() {
    //         try {
    //             const response = await fetch(
    //                 'http://localhost:5000/api/v1/build/48652719-d710-4939-aa74-f21b36018852',
    //                 {
    //                     credentials: 'include',
    //                 }
    //             )
    //             const userResponse = await response.text()
    //             console.log({ userResponse })
    //         } catch (error) {
    //             // add better error handling here
    //         }
    //     }
    //     // Execute the created function directly
    //     runAsync()
    //     // https://stackoverflow.com/a/55854902/1098564
    //     // eslint-disable-next-line
    // }, [])

    if (isLoading) return
    if (error) return console.error('An error has occurred: ' + error.message)

    const configHeader = {
        title: build?.title,
        share: true,
        link: window.location,
        likeBtn: true,
    }
    return (
        <div className="flex-1 flex flex-col gap-5 p-5">
            <HeaderWithBackBtnAndTile
                config={configHeader}
                build={build}
                userId={null}
                refetch={refetch}
            />

            {isFetched && (
                <BuildItem
                    build={build}
                    classname={'hover:bg-transparent cursor-default'}
                    showHeader={false}
                    highlightCreator={true}
                />
            )}

            <Card className="bg-transparent">
                <CardContent className="pt-6">
                    {build?.steps?.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Population</TableHead>
                                    <TableHead>Timer</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {build?.steps?.map((step: any) => (
                                    <TableRow
                                        className="h-10"
                                        key={`${step?.id}`}
                                    >
                                        <TableCell>{step.population}</TableCell>
                                        <TableCell>
                                            {secondsToMinutesAndSeconds(
                                                step.timer || 0
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {step.description}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <NoResultsFound text={'steps'} />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
