import { ProfileForm } from '@/components/profile-form'
import { Separator } from '@/components/ui/separator'

export default function Page() {
    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">
                    Creating a new build order
                </h2>
            </div>
            <Separator />
            <ProfileForm />
        </div>
    )
}
