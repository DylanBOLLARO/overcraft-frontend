'use client'

import { useRouter } from 'next/navigation'

import _ from 'lodash'
import { useAuth } from './providers/context-provider'
import { PAGE_PATH } from '@/constants/enum'
import { Button } from '@/components/ui/button'
import { TypographySmall } from './typography'
import { CustomButton } from './ui-customs/button'
import AuthButton from './buttons/auth-button'

export default function Header() {
    const { user, userId } = useAuth()
    const router = useRouter()

    return (
        <div className="fixed left-0 right-0 top-0 border-b z-50 flex p-3 px-16 justify-between items-center gap-5 h-16 bg-background">
            <h4
                className="text-2xl tracking-wider cursor-pointer font-bold"
                onClick={() => router.push(PAGE_PATH.HOME)}
            >
                Overcraft
            </h4>
            <CustomButton onClick={() => router.push(PAGE_PATH.HOME)}>
                <TypographySmall str={'Home'} />
            </CustomButton>
            <CustomButton onClick={() => router.push('/documentation')}>
                <TypographySmall str={'Documentation'} />
            </CustomButton>
            <div className="flex items-center ml-auto gap-10 h-full">
                {!_.isEmpty(userId) && (
                    <div className="flex gap-5 h-full items-center">
                        <CustomButton
                            onClick={() => router.push(PAGE_PATH.FAVORITES)}
                        >
                            <TypographySmall str={'Favorites'} />
                        </CustomButton>
                        <CustomButton
                            onClick={() => router.push(PAGE_PATH.DASHBOARD)}
                        >
                            <TypographySmall str={'Dashboard'} />
                        </CustomButton>
                    </div>
                )}

                <AuthButton user={user?.userinfo} />
            </div>
        </div>
    )
}
