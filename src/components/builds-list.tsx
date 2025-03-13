import { BuildItem } from './build-item'

export function BuildsList({ builds, update = false }: any) {
    return (
        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 flex-wrap gap-2">
            {builds
                ?.slice(0, 15)
                ?.map((build: any) => (
                    <BuildItem
                        key={build?.slug}
                        build={build}
                        update={update}
                    />
                ))}
        </div>
    )
}
