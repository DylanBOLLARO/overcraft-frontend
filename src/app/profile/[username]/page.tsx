"use client";

import { Card, CardDescription, CardHeader } from "@/src/components/ui/card";
import { capitalize } from "@/src/services/utils";
import { Blocks, Heart, Shield, ShieldPlus } from "lucide-react";
import { useUser } from "@/src/services/queries";
import HeaderWithBackBtnAndTile from "@/src/components/new/header-back-title";
import InformationCard from "@/src/components/new/information-card";
import { BuildsList } from "@/src/components/new/builds-list";
import { NoResultsFound } from "@/src/components/new/no-builds-found";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { isLoading, error, data: userData, isFetched } = useUser(username);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	const configHeader = { title: userData?.username, share: false };

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<HeaderWithBackBtnAndTile config={configHeader} />

			{userData?.description && (
				<Card>
					<CardHeader>
						{capitalize(userData?.description) || "No description"}
					</CardHeader>
				</Card>
			)}

			<div className="flex gap-2">
				{userData?.role === "ADMIN" && (
					<InformationCard
						data={{
							title: undefined,
							content: capitalize(userData?.role),
							icone: (
								<ShieldPlus className="h-10 w-10 text-pink-700  opacity-75" />
							)
						}}
					/>
				)}

				{userData?.role === "MEMBER" && (
					<InformationCard
						data={{
							title: undefined,
							content: capitalize(userData?.role),
							icone: (
								<Shield className="h-10 w-10 text-protoss-foreground opacity-75" />
							)
						}}
					/>
				)}

				<InformationCard
					data={{
						title: "Total builds published",
						content: userData?._count?.build || 0,
						icone: <Blocks className="h-8 w-8 opacity-75" />
					}}
				/>
				<InformationCard
					data={{
						title: "Number of likes",
						content: userData?._count?.like || 0,
						icone: (
							<Heart
								strokeWidth={3}
								className="h-8 w-8 text-pink-700 opacity-65"
							/>
						)
					}}
				/>
			</div>

			<div className="flex flex-col gap-5">
				<div className="flex flex-row items-end justify-between px-3">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
						All builds order published
					</h4>
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
						{`Total: ${userData?.build?.length || 0}`}
					</h4>
				</div>

				{isFetched && userData.build?.length > 0 ? (
					<BuildsList builds={userData?.build} />
				) : (
					<NoResultsFound text={"builds"} />
				)}
			</div>
		</div>
	);
}
