"use client";

import { CardBuild } from "@/src/components/CardBuild";
import { DialogCreateBuild } from "@/src/components/DialogCreateBuild";
import { Icons } from "@/src/components/icons";
import { ImportButton } from "@/src/components/ImportButton";
import { useConnectedUserContext } from "@/src/components/layout/providers";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { useUser } from "@/src/services/queries";
import { cn } from "@/src/services/utils";

export default function Page() {
	const { connectedUser } = useConnectedUserContext();
	const {
		isLoading,
		error,
		data: user,
		refetch
	} = useUser(connectedUser?.id);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<div className="flex flex-row gap-5 justify-between">
				<Button
					onClick={() => window.history.back()}
					className={cn(
						buttonVariants({ variant: "outline" }),
						"left-4 top-4 md:left-8 md:top-8 self-start"
					)}
				>
					<>
						<Icons.chevronLeft className="mr-2 h-4 w-4" />
						Back
					</>
				</Button>

				<div className="flex flex-row gap-2">
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
