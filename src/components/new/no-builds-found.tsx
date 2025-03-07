import { Frown } from 'lucide-react'

export function NoResultsFound({ text = 'results' }: any) {
    return (
        <div className="flex flex-1 justify-center">
            <h4 className="flex text-3xl font-semibold my-10 ">
                {`No ${text} found`}
                <Frown className="self-center ml-5 h-10 w-10" />
            </h4>
        </div>
    )
}
