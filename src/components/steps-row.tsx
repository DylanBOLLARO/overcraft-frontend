import { Card } from '@/components/ui/card'
import { TypographyMuted } from './typography'
import { Clock9, PersonStanding } from 'lucide-react'
import { formatSeconds } from '@/lib/utils'

export const StepsRow = ({ step }: any) => {
    return (
        <Card className="p-3 flex gap-10 items-center text-muted-foreground">
            <div className="flex gap-3 w-24 items-center font-bold">
                <TypographyMuted str={formatSeconds(step.timer)} />
                <Clock9 />
            </div>
            <div className="flex gap-3 w-24 items-center font-bold ">
                <TypographyMuted str={step.population} />
                <PersonStanding />
            </div>
            <TypographyMuted str={step.description} />
        </Card>
    )
}
