"use client";

import { CardBuild } from "@/src/components/CardBuild";
import { DialogCreateBuild } from "@/src/components/DialogCreateBuild";
import { ImportButton } from "@/src/components/ImportButton";
import { useAllBuildsOfUser } from "@/src/services/queries";

export default function Page() {
	const {
		data: builds,
		isFetching: isFetchingBuild,
		refetch
	} = useAllBuildsOfUser();

	return (
		!isFetchingBuild && (
			<>
				<div className="flex flex-row gap-4 justify-end">
					<ImportButton refetch={refetch} />
					<DialogCreateBuild refetch={refetch} />
				</div>
				<div className="flex flex-col gap-1 p-1 border rounded">
					{builds?.length > 0 ? (
						builds.map((build: any) => {
							return (
								<CardBuild
									className={`animate-fade animate-once animate-duration-300`}
									build={build}
									key={build.id}
									width={120}
									height={120}
								/>
							);
						})
					) : (
						<p className="p-5">
							You have not yet created a build order.
						</p>
					)}
				</div>
			</>
		)
	);
}
