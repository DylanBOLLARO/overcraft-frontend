"use client";

import { Icons } from "@/src/components/icons";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { pagePath } from "@/src/constants/enum";
import {
	add_step_build,
	delete_step_in_build_steps,
	get_all_step_build_by_build_id,
	get_connected_user_builds,
	move_step_in_build_steps
} from "@/src/lib/networking";
import { cn, secondsToMinutesAndSeconds } from "@/src/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "../../../../components/columns";
import { DataTable } from "../../../../components/data-table";
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
import { useOneBuild, useSteps } from "@/src/services/queries";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";

export default function Page({ params }: { params: { build_id: string } }) {
	const [description, setDescription] = useState<string>("");
	const [population, setPopulation] = useState<string>("");
	const [timer, setTimer] = useState<string>("");

	const handleAddButtonClick = async () => {
		if (description && population && timer) {
			await add_step_build({
				description,
				build_id: "" + build.id,
				position: "" + build.steps.length,
				timer: "" + timer,
				population
			});
		}
	};

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
				<div className="flex flex-row gap-5 justify-between">
					<Link
						href={pagePath.DASHBOARD}
						className={cn(
							buttonVariants({ variant: "secondary" }),
							"left-4 top-4 md:left-8 md:top-8 self-start"
						)}
					>
						<>
							<Icons.chevronLeft className="mr-2 h-4 w-4" />
							Back
						</>
					</Link>

					<div className="flex flex-row gap-2">
						<ExportButton selectedUserBuild={build} />

						<DialogEditBuild selectedUserBuild={build} />

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
													{step.description}
												</TableCell>
												<TableCell>
													{secondsToMinutesAndSeconds(
														step.timer || 0
													)}
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
				<div className="flex flex-1 flex-row justify-between gap-3 mb-28">
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
					<Input
						className="h-8 w-24"
						placeholder="Timer"
						value={timer}
						onChange={(e) => setTimer(e.target.value)}
					/>
					<Button
						className="h-8"
						variant="outline"
						onClick={async () => {
							await handleAddButtonClick();
							setDescription("");
							setPopulation("");
							setTimer("");
						}}
						disabled={!description || !population || !timer}
					>
						<PlusCircle className="mr-2 h-4 w-4" />
						Add
					</Button>
				</div>
			</div>
		</main>
	);
}
