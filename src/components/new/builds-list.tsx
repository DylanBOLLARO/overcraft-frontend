import { BuildItem } from "./build-item";

export function BuildsList({ builds }: any) {
	return (
		<div className="grid 2xl:grid-cols-3 lg:grid-cols-2 flex-wrap gap-2 mt-5">
			{builds?.map((build: any) => (
				<BuildItem key={build?.slug} build={build} />
			))}
		</div>
	);
}
