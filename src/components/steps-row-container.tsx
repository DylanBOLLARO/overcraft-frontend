import { StepsRow } from '@/components/steps-row'

export const StepsRowContainer = ({ steps }: any) => {
    return (
        <div className="flex flex-col gap-y-1 ">
            {steps?.map((step: any) => {
                return <StepsRow key={step.id} step={step} />
            })}
        </div>
    )
}
