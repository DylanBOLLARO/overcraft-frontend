"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import { capitalize, cn, isRoleGuest } from "@/src/services/utils";
import { Album, Heart } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { format } from "date-fns";
import { ProfileBuildsList } from "@/src/components/new/profile-builds-list";
import { useUser } from "@/src/services/queries";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Icons } from "@/src/components/icons";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { isLoading, error, data: userData } = useUser(username);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<div className="flex flex-row gap-5 justify-between relative">
				<Button
					onClick={() => window.history.back()}
					className={cn(
						buttonVariants({ variant: "outline" }),
						"left-4 top-4 md:left-8 md:top-8 self-start z-10"
					)}
				>
					<>
						<Icons.chevronLeft className="mr-2 h-4 w-4" />
						Back
					</>
				</Button>
				<h2 className="text-4xl font-bold tracking-tight text-primary absolute inset-0 text-center mx-auto">
					{capitalize(userData?.username)}
				</h2>
			</div>

			<Card>
				{userData?.description && (
					<CardHeader>
						<CardDescription className="">
							{capitalize(userData?.description) ||
								"No description"}
						</CardDescription>
					</CardHeader>
				)}
				<CardContent className="flex gap-4">
					{!isRoleGuest(userData?.role) && (
						<Badge className="bg-pink-700 hover:bg-pink-800">
							{capitalize(userData?.role)}
						</Badge>
					)}
					<Badge>{format(userData?.created_at, "MMMM yyyy")}</Badge>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total build published
						</CardTitle>
						<Album className="hover:scale-110 hover:text-primary duration-100 transition-colors cursor-pointer" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{userData?._count?.build || 0}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Number of likes
						</CardTitle>
						<Heart className="hover:scale-110 hover:text-pink-700 duration-100 transition-colors cursor-pointer" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{userData?._count?.like || 0}
						</div>
					</CardContent>
				</Card>
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
