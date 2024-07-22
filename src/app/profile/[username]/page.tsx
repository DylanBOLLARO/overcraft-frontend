"use client";

import { useUserContext } from "../../layout";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import { capitalize, isRoleGuest } from "@/src/services/utils";
import { Album, Heart } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { format } from "date-fns";
import { ProfileBuildsList } from "@/src/components/new/profile-builds-list";
import { getUserProfileByUsername } from "@/src/services/api/build-private";
import { getAllPublicBuildsOfUserByUserId } from "@/src/services/api/build-public";
import { getNumberOfLikeOfUserByUserId } from "@/src/services/api/like";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { user } = useUserContext();
	const [profile, setProfile] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	const createUserProfile = async () => {
		setIsLoading(true);
		let profile = undefined;
		if (username === user?.username) {
			profile = user;
		} else {
			const user: any = await getUserProfileByUsername(username);
			if (user) profile = user;
		}
		if (profile) {
			const builds = await getAllPublicBuildsOfUserByUserId(profile.id);
			const likes = await getNumberOfLikeOfUserByUserId(profile.id);
			profile = { ...profile, builds, likes };
		}
		setProfile({ ...profile });
		setIsLoading(false);
	};

	useEffect(() => {
		createUserProfile();
	}, []);

	if (!profile) <p>{"No profile data to display"}</p>;

	return (
		!isLoading &&
		profile && (
			<>
				<div className="flex gap-5 items-end">
					<h2 className="text-4xl font-bold tracking-tight text-primary">
						{capitalize(profile.username)}
					</h2>
				</div>

				<Card>
					<CardHeader>
						<CardDescription className="">
							{capitalize(profile.description) ||
								"No description"}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex gap-4">
						{!isRoleGuest(profile.role) && (
							<Badge className="bg-pink-700 hover:bg-pink-800">
								{capitalize(profile?.role)}
							</Badge>
						)}
						<Badge>{format(profile.created_at, "MMMM yyyy")}</Badge>
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
								{profile?.builds?.length || 0}
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
								{profile?.likes || 0}
							</div>
						</CardContent>
					</Card>
				</div>
				<Card className="col-span-3">
					<CardHeader className="flex flex-row items-end justify-between">
						<CardTitle>{`All builds order published`}</CardTitle>
						<CardTitle className="text-sm text-muted-foreground">{`Total: ${profile?.builds?.length || 0}`}</CardTitle>
					</CardHeader>
					{profile?.builds && (
						<CardContent>
							<ProfileBuildsList builds={profile.builds} />
						</CardContent>
					)}
				</Card>
			</>
		)
	);
}
