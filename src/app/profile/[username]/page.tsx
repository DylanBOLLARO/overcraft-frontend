"use client";

import { useUserContext } from "../../layout";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import { capitalize, formatDate, isRoleGuest } from "@/src/lib/utils";
import { Album, Heart } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { format } from "date-fns";
import { ProfileBuildsList } from "@/src/components/new/profile-builds-list";
import { getUserProfileByConfig } from "@/src/services/api";
import qs from "qs";

export default function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { user } = useUserContext();
	const [profile, setProfile] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			if (username === user?.username) {
				setProfile(user);
			} else {
				const config = qs.stringify({ username }, { delimiter: ";" });
				const user: any = await getUserProfileByConfig(config);
				if (user) setProfile(user);
			}
		})();
		setIsLoading(false);
	}, [username, user]);

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
							<Album />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">17</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Number of likes
							</CardTitle>
							<Heart />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">64</div>
						</CardContent>
					</Card>
				</div>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>All builds order published</CardTitle>
					</CardHeader>
					<CardContent>
						<ProfileBuildsList />
					</CardContent>
				</Card>
			</>
		)
	);
}
