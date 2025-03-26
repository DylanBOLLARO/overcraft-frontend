import { StepsRow } from '@/components/steps-row'

export const StepsRowContainer = ({
    steps,
    edit = false,
    refetch = () => {},
    currentIndex = null,
    isRunning = null,
}: any) => {
    return (
        <div className="flex flex-col gap-y-1 ">
            {steps?.map((step: any) => {
                return (
                    <StepsRow
                        key={step.id}
                        step={step}
                        edit={edit}
                        refetch={refetch}
                        currentIndex={currentIndex}
                        isRunning={isRunning}
                    />
                )
            })}
        </div>
    )
}
