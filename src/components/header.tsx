'use client'

import { useRouter } from 'next/navigation'

import _ from 'lodash'
import { useAuth } from './providers/context-provider'
import { PAGE_PATH } from '@/constants/enum'
import { Button } from '@/components/ui/button'
import { TypographySmall } from './typography'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <div className="fixed left-0 right-0 top-0 border-b z-50 bg-background flex p-3 px-5 justify-between items-center gap-5 h-16">
            <div className="flex gap-3">
                <h4
                    className="text-2xl font-semibold tracking-wider ml-5 cursor-pointer"
                    onClick={() => router.push(PAGE_PATH.HOME)}
                >
                    Overcraft
                </h4>
            </div>
            <div className="flex items-center ml-auto gap-10">
                <div className="lead">
                    {_.isEmpty(user) ? (
                        <Button
                            variant="default"
                            className="h-auto font-semibold "
                            onClick={() => {
                                router.replace('/auth/login')
                            }}
                        >
                            <TypographySmall str={'Login'} />
                        </Button>
                    ) : (
                        <div className="flex gap-5">
                            <Button
                                className="h-auto font-semibold"
                                onClick={() => router.push(PAGE_PATH.DASHBOARD)}
                                variant="ghost"
                            >
                                <TypographySmall str={'Dashboard'} />
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-auto font-semibold "
                                onClick={() => {
                                    router.replace('/auth/logout')
                                }}
                            >
                                <TypographySmall str={'Logout'} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
