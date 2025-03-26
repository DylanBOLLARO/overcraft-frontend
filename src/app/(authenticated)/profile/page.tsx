'use client'

import { UserPreferences } from '@/components/profile/user-preferences'
import { UserProfile } from '@/components/profile/user-profile'

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-5">
            <UserPreferences />
            <UserProfile />
        </div>
    )
}
