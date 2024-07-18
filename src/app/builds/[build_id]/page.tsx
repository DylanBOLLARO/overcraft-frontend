"use client";

import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
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

export default function Page({ params }: { params: { build_id: string } }) {
	const { build_id } = params;

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
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div className="flex flex-col gap-4">
				{!isFetchingBuild && (
					<Card
						className="sm:col-span-2 bg-transparent"
						x-chunk="dashboard-05-chunk-0"
					>
						<CardHeader className="pb-3">
							<CardTitle>{build.title}</CardTitle>
							<CardDescription className="">
								{build.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-wrap gap-3">
							<Badge>
								{build.race[0] + "v" + build.v_race[0]}
							</Badge>
							<Badge>
								{formatDate(build.updatedAt, "MMMM yyyy")}
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
										{/* <TableHead>Actions</TableHead> */}
									</TableRow>
								</TableHeader>
								<TableBody>
									{steps.map((step: any) => (
										<TableRow
											className="h-10"
											key={`${step?.id}`}
										>
											<TableCell>
												{step.population}
											</TableCell>
											<TableCell>
												{step.description}
											</TableCell>
											<TableCell>
												{secondsToMinutesAndSeconds(
													step.timer || 0
												)}
											</TableCell>
											{/* <TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
													>
														<MoreHorizontal className="h-4 w-4" />
														<span className="sr-only">
															Toggle menu
														</span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>
														Move up
													</DropdownMenuItem>
													<DropdownMenuItem>
														Move down
													</DropdownMenuItem>
													<DropdownMenuItem>
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell> */}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
			</div>
		</main>
	);
}
