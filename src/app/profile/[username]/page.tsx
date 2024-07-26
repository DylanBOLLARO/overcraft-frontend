"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import { capitalize, isRoleGuest } from "@/src/services/utils";
import { Blocks, CalendarPlus, Heart, Shield, ShieldPlus } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { format } from "date-fns";
import { ProfileBuildsList } from "@/src/components/new/profile-builds-list";
import { useUser } from "@/src/services/queries";
import HeaderWithBackBtnAndTile from "@/src/components/new/header-back-title";
import InformationCard from "@/src/components/new/information-card";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { isLoading, error, data: userData } = useUser(username);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	const configHeader = { title: userData?.username, share: false };

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<HeaderWithBackBtnAndTile config={configHeader} />

			{userData?.description && (
				<Card>
					<CardHeader>
						<CardDescription className="">
							{capitalize(userData?.description) ||
								"No description"}
						</CardDescription>
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
						title: "Total build published",
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
				<InformationCard
					data={{
						title: "Profile created on",
						content: format(userData?.created_at, "dd.MM.yy"),
						icone: <CalendarPlus className="h-8 w-8 opacity-75" />
					}}
				/>
				{/* Discord link */}
			</div>

			<Card className="col-span-3">
				<CardHeader className="flex flex-row items-end justify-between">
					<CardTitle>{`All builds order published`}</CardTitle>
					<CardTitle className="text-sm text-muted-foreground">{`Total: ${userData?.build?.length || 0}`}</CardTitle>
				</CardHeader>
				{userData?.build && (
					<CardContent>
						<ProfileBuildsList builds={userData.build} />
					</CardContent>
				)}
			</Card>
		</div>
	);
}
