'use client'

import { useRouter } from 'next/navigation'

import _ from 'lodash'
import { useAuth } from './providers/context-provider'
import { PAGE_PATH } from '@/constants/enum'
import { Button } from '@/components/ui/button'
import { TypographySmall } from './typography'
import { CustomButton } from './ui-customs/button'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()

    return (
        <div className="fixed left-0 right-0 top-0 border-b z-50 flex p-3 px-16 justify-between items-center gap-5 h-16 bg-black border-none">
            <h4
                className="text-2xl tracking-wider cursor-pointer font-bold"
                onClick={() => router.push(PAGE_PATH.HOME)}
            >
                Overcraft
            </h4>

            <div className="flex items-center ml-auto gap-10 h-full">
                {_.isEmpty(user) && (
                    <Button
                        variant="default"
                        className="h-full font-semibold px-10"
                        onClick={() => {
                            router.replace('/auth/login')
                        }}
                    >
                        <TypographySmall str={'Login'} />
                    </Button>
                )}
                {!_.isEmpty(user) && (
                    <div className="flex gap-5 h-full items-center">
                        {!_.isEmpty(user) && (
                            <p className="text-muted-foreground ml-16">{`Hello ${user.userinfo.given_name}`}</p>
                        )}
                        <CustomButton
                            onClick={() => router.push(PAGE_PATH.DASHBOARD)}
                        >
                            <TypographySmall str={'Dashboard'} />
                        </CustomButton>

                        <CustomButton
                            onClick={() => {
                                router.replace('/auth/logout')
                            }}
                        >
                            <TypographySmall str={'Logout'} />
                        </CustomButton>
                    </div>
                )}
            </div>
        </div>
    )
}
