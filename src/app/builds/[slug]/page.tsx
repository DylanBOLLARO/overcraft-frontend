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
import { useUserContext } from "../../layout";
import { useOnePublicBuild } from "@/src/services/tanstack-queries/build-public";
import { useSteps } from "@/src/services/tanstack-queries/step";
import { Album } from "lucide-react";

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const { user } = useUserContext();
	const build_id = slug.split("-")[0];
	const { data: build, isFetching: isFetchingBuild } =
		useOnePublicBuild(build_id);
	const {
		isPending,
		error,
		data: steps,
		isFetching: isFetchingSteps
	} = useSteps(build_id);

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

			<div className="flex flex-row gap-3">
				<Card className="flex-1">
					<CardHeader className="pb-3">
						<CardTitle>Created by:</CardTitle>
						<CardDescription className="text-balance leading-relaxed">
							{"	getNameOfUserByUserId() in backend"}
						</CardDescription>
					</CardHeader>
				</Card>
			</div>

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
			{user && !isFetchingBuild && !isFetchingSteps && (
				<CreateComment user={user} />
			)}
		</>
	);
}
