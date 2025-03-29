'use client'

import { UserPreferences } from '@/components/profile/user-preferences'

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-5">
            <UserPreferences />
        </div>
    )
}
