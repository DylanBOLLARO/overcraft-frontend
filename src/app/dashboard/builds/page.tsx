"use client";

import { CardBuild } from "@/src/components/CardBuild";
import { DialogCreateBuild } from "@/src/components/DialogCreateBuild";
import { ImportButton } from "@/src/components/ImportButton";
import { useConnectedUserContext } from "@/src/components/layout/providers";
import { useUser } from "@/src/services/queries";

export default function Page() {
	const { connectedUser } = useConnectedUserContext();
	const {
		isLoading,
		error,
		data: user,
		refetch
	} = useUser(connectedUser?.id);

	console.log(user?.build);
	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<div className="flex flex-row gap-5 justify-between">
				<div className="flex flex-row gap-2 ml-auto">
					<ImportButton
						refetch={refetch}
						userId={connectedUser?.id}
					/>
					<DialogCreateBuild
						refetch={refetch}
						userId={connectedUser?.id}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-1 p-1 border rounded">
				{user?.build?.length > 0 ? (
					user?.build.map((build: any) => {
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
		</div>
	);
}
