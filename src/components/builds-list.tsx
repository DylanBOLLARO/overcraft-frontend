import { BuildItem } from './build-item'
import { AnimatedGroup } from './ui/animated-group'

export function BuildsList({ builds, update = false }: any) {
    return (
        <AnimatedGroup className="grid 2xl:grid-cols-3 lg:grid-cols-2 flex-wrap gap-2">
            {builds?.map((build: any) => (
                <BuildItem key={build?.slug} build={build} update={update} />
            ))}
        </AnimatedGroup>
    )
}
