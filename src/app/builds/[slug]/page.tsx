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
import { useOneBuild, useSteps } from "@/src/services/queries";
import { formatDate } from "date-fns";
import { Badge } from "@/src/components/ui/badge";
import { secondsToMinutesAndSeconds } from "@/src/lib/utils";
import CreateComment from "@/src/components/new/card-create-comment";
import { useUserContext } from "../../layout";

export default function Page({ params }: { params: { slug: string } }) {
	const { slug } = params;
	const { user } = useUserContext();
	const build_id = slug.split("-")[0];
	const { data: build, isFetching: isFetchingBuild } = useOneBuild(build_id);
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

			{!isFetchingSteps && (
				<Card className="bg-transparent">
					<CardContent className="pt-6">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Population</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Timer</TableHead>
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
											{step.description}
										</TableCell>
										<TableCell>
											{secondsToMinutesAndSeconds(
												step.timer || 0
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			)}
			{user && <CreateComment user={user} />}
		</>
	);
}
