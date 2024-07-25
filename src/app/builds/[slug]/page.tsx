"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/src/components/ui/table";

import { formatDate } from "date-fns";
import { Badge } from "@/src/components/ui/badge";
import { secondsToMinutesAndSeconds } from "@/src/services/utils";
import CreateComment from "@/src/components/new/card-create-comment";
import { getUserById } from "@/src/services/api";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { PAGE_PATH } from "@/src/constants/enum";
import { useBuild, useSteps } from "@/src/services/queries";
import { useConnectedUserContext } from "@/src/components/layout/providers";

export default function Page({ params }: { params: { slug: string } }) {
	const router = useRouter();

	const { slug } = params;
	const { connectedUser } = useConnectedUserContext();
	const buildId = slug.split("-")[0];
	const { data: build, isFetching: isFetchingBuild } = useBuild(buildId);

	const [userUsername, setUserUsername] = useState(() => undefined);

	useEffect(() => {
		(async () => {
			const response = await getUserById(build?.user_id);
			if (response && response?.username) {
				setUserUsername(response.username);
			}
		})();
	}, [build]);

	const {
		isPending,
		error,
		data: steps,
		isFetching: isFetchingSteps
	} = useSteps(buildId);

	if (isPending) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<>
			{!isFetchingBuild && (
				<Card>
					<CardHeader className="pb-3">
						<CardTitle>{build.title}</CardTitle>
						<CardDescription className="">
							{build.description}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-3">
						<Badge>{build.race[0] + "v" + build.v_race[0]}</Badge>
						<Badge>
							{formatDate(build.updated_at, "MMMM yyyy")}
						</Badge>
					</CardContent>
				</Card>
			)}

			{userUsername && (
				<div className="flex flex-row gap-3">
					<Card className="flex-1">
						<CardHeader className="pb-3">
							<CardTitle>Created by:</CardTitle>
							<CardDescription className="text-balance leading-relaxed">
								<Button
									className="p-0"
									variant={"link"}
									onClick={() =>
										router.push(
											`${PAGE_PATH.PROFILE}/${userUsername}`
										)
									}
								>
									{userUsername}
								</Button>
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			)}
			{!isFetchingSteps && (
				<Card className="bg-transparent">
					<CardContent className="pt-6">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Population</TableHead>
									<TableHead>Timer</TableHead>
									<TableHead>Description</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{steps.map((step: any) => (
									<TableRow
										className="h-10"
										key={`${step?.id}`}
									>
										<TableCell>{step.population}</TableCell>
										<TableCell>
											{secondsToMinutesAndSeconds(
												step.timer || 0
											)}
										</TableCell>
										<TableCell>
											{step.description}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
			{connectedUser && !isFetchingBuild && !isFetchingSteps && (
				<CreateComment user={connectedUser} />
			)}
		</>
	);
}
