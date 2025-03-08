import { Blocks, icons } from 'lucide-react'
import { Card } from '../ui/card'

interface InformationCardProps {
    data: {
        title: string | undefined
        content: string | undefined
        icone: any | undefined
    }
}

export default function InformationCard({ data }: InformationCardProps) {
    return (
        <Card className="flex flex-col space-y-2 p-4 max-w-fit px-6 hover:scale-105 transition-transform duration-75 justify-center">
            {data?.title && (
                <h4 className="font-semibold tracking-normal opacity-75">
                    {data?.title}
                </h4>
            )}
            <div className="flex justify-center gap-3 items-center">
                <h3 className="text-2xl font-bold tracking-wider">
                    {data?.content}
                </h3>
                {data?.icone}
            </div>
        </Card>
    )
}
