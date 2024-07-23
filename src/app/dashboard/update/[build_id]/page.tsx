"use client";

import { Icons } from "@/src/components/icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { PAGE_PATH } from "@/src/constants/enum";
import { cn, secondsToMinutesAndSeconds } from "@/src/services/utils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { DialogEditBuild } from "@/src/components/DialogEditBuild";
import { DialogDeleteBuild } from "@/src/components/DialogDeleteBuild";
import ExportButton from "@/src/components/ExportButton";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
	add_step_build,
	delete_step_in_build_steps,
	move_step_in_build_steps
} from "@/src/services/user";
import { useConnectedUserContext } from "@/src/app/layout";
import { useBuildOfUser, useSteps } from "@/src/services/queries";

export default function Page({ params }: { params: { build_id: string } }) {
	const { connectedUser } = useConnectedUserContext();
	const { build_id } = params;

	const {
		data: build,
		isFetching: isFetchingBuild,
		refetch: refetch_build
	} = useBuildOfUser(connectedUser?.id, build_id);

	const {
		isPending,
		error,
		data: steps,
		isFetching: isFetchingSteps,
		refetch: refetch_steps
	} = useSteps(build_id);

	const [description, setDescription] = useState<string>("");
	const [population, setPopulation] = useState<string>("");
	const [selectedMinute, setSelectedMinute] = useState<string>("");
	const [selectedSeconds, setSelectedSeconds] = useState<string>("");

	const handleAddButtonClick = async (
		description: any,
		population: any,
		selectedMinute: any,
		selectedSeconds: any,
		build: any
	) => {
		if (description && population && selectedMinute && selectedSeconds) {
			await add_step_build({
				description,
				build_id: "" + build.id,
				position: "" + build.steps.length,
				timer:
					"" +
					(parseInt(selectedMinute) * 60 + parseInt(selectedSeconds)),
				population
			});
		}
	};
	if (isPending) return;
	if (!build) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		!isFetchingBuild &&
		!isFetchingSteps && (
			<>
				<div className="flex flex-row gap-5 justify-between">
					<Link
						href={PAGE_PATH.DASHBOARD}
						className={cn(
							buttonVariants({ variant: "outline" }),
							"left-4 top-4 md:left-8 md:top-8 self-start"
						)}
					>
						<>
							<Icons.chevronLeft className="mr-2 h-4 w-4" />
							Back
						</>
					</Link>

					<div className="flex flex-row gap-2">
						<ExportButton
							selectedUserBuild={{ ...build, steps: steps }}
						/>
						<DialogEditBuild
							refetch_build={refetch_build}
							selectedUserBuild={build}
						/>
						<DialogDeleteBuild selectedUserBuildId={build.id} />
					</div>
				</div>
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
										<TableHead>Timer</TableHead>
										<TableHead>Description</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{steps
										.sort(
											(a: any, b: any) =>
												a.position - b.position
										)
										.map((step: any, index: number) => (
											<TableRow
												className="h-10"
												key={`${step?.id}`}
											>
												<TableCell>
													{step.population}
												</TableCell>
												<TableCell>
													{secondsToMinutesAndSeconds(
														step.timer || 0
													)}
												</TableCell>
												<TableCell>
													{step.description}
												</TableCell>
												<TableCell>
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
														>
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
															<DropdownMenuItem
																onClick={async () => {
																	await move_step_in_build_steps(
																		{
																			id:
																				"" +
																				steps[
																					index
																				]
																					?.id,
																			build_id:
																				"" +
																				build.id,
																			move: "DOWN"
																		}
																	);
																	refetch_steps();
																}}
															>
																Move up
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={async () => {
																	await move_step_in_build_steps(
																		{
																			id:
																				"" +
																				steps[
																					index
																				]
																					?.id,
																			build_id:
																				"" +
																				build.id,
																			move: "UP"
																		}
																	);
																	refetch_steps();
																}}
															>
																Move down
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={async () => {
																	await delete_step_in_build_steps(
																		steps[
																			index
																		]?.id
																	);
																	refetch_steps();
																}}
															>
																Delete
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				)}
				<div className="flex flex-1 flex-row justify-between gap-3">
					<Input
						className="h-8"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Input
						className="h-8 w-24"
						placeholder="Population"
						value={population}
						onChange={(e) => setPopulation(e.target.value)}
					/>
					<div className="flex flex-row  gap-3">
						<Input
							className="h-8 w-24"
							placeholder="Minutes"
							value={selectedMinute}
							onChange={(e) => setSelectedMinute(e.target.value)}
						/>
						<Input
							className="h-8 w-24"
							placeholder="Secondes"
							value={selectedSeconds}
							onChange={(e) => setSelectedSeconds(e.target.value)}
						/>
					</div>

					<Button
						className="h-8"
						variant="outline"
						onClick={async () => {
							await handleAddButtonClick(
								description,
								population,
								selectedMinute,
								selectedSeconds,
								{ ...build, steps: steps }
							);
							setDescription("");
							setPopulation("");
							setSelectedMinute("");
							setSelectedSeconds("");
							refetch_steps();
						}}
						disabled={
							!description ||
							!population ||
							!selectedMinute ||
							!selectedSeconds
						}
					>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add
					</Button>
				</div>
			</>
		)
	);
}
