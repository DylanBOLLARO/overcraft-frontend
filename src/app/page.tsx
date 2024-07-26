"use client";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "../components/ui/tabs";
import CardDisplayBuild from "../components/new/card-display-build";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import { BadgeInfo, ListFilter, Swords } from "lucide-react";
import { Button } from "../components/ui/button";
import { capitalize } from "../services/utils";
import { TAB_SELECTION } from "../constants/variable";
import DevelopThisWebsite from "../components/new/help-me-to-develop-this-website";
import { useBuilds } from "../services/queries";
import { BuildsList } from "../components/new/build-list";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "../components/ui/select";

export default function IndexPage() {
	const { isPending, error, data: builds, isFetching } = useBuilds();

	if (isPending) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<Tabs defaultValue="all">
				<div className="flex items-center gap-4">
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All</SelectItem>
							<SelectItem value="Terran">Terran</SelectItem>
							<SelectItem value="Zerg">Zerg</SelectItem>
							<SelectItem value="Protoss">Protoss</SelectItem>
						</SelectContent>
					</Select>
					<Swords className="opacity-75" />
					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All</SelectItem>
							<SelectItem value="Terran">Terran</SelectItem>
							<SelectItem value="Zerg">Zerg</SelectItem>
							<SelectItem value="Protoss">Protoss</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All Types">All Types</SelectItem>
							<SelectItem value="Macro">Macro</SelectItem>
							<SelectItem value="Cheese">Cheese</SelectItem>
							<SelectItem value="All-in">All-in</SelectItem>
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Stars" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All Stars">All Stars</SelectItem>
							<SelectItem value="1 Star">1 Star</SelectItem>
							<SelectItem value="2 Stars">2 Stars</SelectItem>
							<SelectItem value="3 Stars">3 Stars</SelectItem>
						</SelectContent>
					</Select>

					{/* <TabsList>
						{TAB_SELECTION.map((tabsValue: string) => {
							return (
								<TabsTrigger value={tabsValue} key={tabsValue}>
									{capitalize(tabsValue)}
								</TabsTrigger>
							);
						})}
					</TabsList> */}
					<div className="ml-auto flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="h-7 gap-1 text-sm"
								>
									<ListFilter className="h-3.5 w-3.5 mr-2" />
									<span className="sr-only sm:not-sr-only">
										Filter
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="min-w-[10rem]"
							>
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Most liked
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Most difficult
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Least difficult
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Most recent
								</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button
							variant="outline"
							size="sm"
							className="h-7 gap-1 text-sm"
							disabled
						>
							<BadgeInfo className="h-3.5 w-3.5" />
						</Button>
					</div>
				</div>

				{TAB_SELECTION.map((tabsValue: string) => {
					return (
						<TabsContent value={tabsValue} key={tabsValue}>
							{!isFetching && (
								<div className="grid 2xl:grid-cols-3 lg:grid-cols-2 flex-wrap gap-2 mt-5">
									{builds?.filter((build: any) => {
										if (tabsValue === "all") return true;
										return (
											build.race?.toUpperCase() ===
											tabsValue?.toUpperCase()
										);
									}).length === 0 ? (
										<p>
											No builds available for the selected
											race.
										</p>
									) : (
										builds
											?.filter((build: any) => {
												if (tabsValue === "all")
													return true;
												return (
													build.race?.toUpperCase() ===
													tabsValue?.toUpperCase()
												);
											})
											.sort(
												(a: any, b: any) =>
													b?._count?.like -
													a?._count?.like
											)
											.map((build: any) => (
												<BuildsList build={build} />
											))
									)}
								</div>
							)}
						</TabsContent>
					);
				})}
			</Tabs>
			<DevelopThisWebsite />
		</div>
	);
}
