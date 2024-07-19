"use client";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "../components/ui/tabs";
import CardDisplayBuild from "../components/new/card-display-build";
import { useBuilds } from "../services/queries";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import { BadgeInfo, ListFilter } from "lucide-react";
import { Button } from "../components/ui/button";
import { capitalize } from "../lib/utils";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "../components/ui/card";

export default function IndexPage() {
	const { isPending, error, data: builds, isFetching } = useBuilds();
	const typeTabs = ["all", "terran", "zerg", "protoss"];

	if (isPending) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<>
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								{typeTabs.map((tabsValue: string) => {
									return (
										<TabsTrigger
											value={tabsValue}
											key={tabsValue}
										>
											{capitalize(tabsValue)}
										</TabsTrigger>
									);
								})}
							</TabsList>
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-7 gap-1 text-sm"
										>
											<ListFilter className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only">
												Filter
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>
											Filter by
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Most liked
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem disabled>
											The most recent
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

						{typeTabs.map((tabsValue: string) => {
							return (
								<TabsContent value={tabsValue} key={tabsValue}>
									{!isFetching && (
										<div className="flex flex-wrap gap-5 mt-5">
											{builds.filter((build: any) => {
												if (tabsValue === "all")
													return true;
												return (
													build.race?.toUpperCase() ===
													tabsValue?.toUpperCase()
												);
											}).length === 0 ? (
												<p>
													No builds available for the
													selected race.
												</p>
											) : (
												builds
													.filter((build: any) => {
														if (tabsValue === "all")
															return true;
														return (
															build.race?.toUpperCase() ===
															tabsValue?.toUpperCase()
														);
													})
													.map((build: any) => (
														<CardDisplayBuild
															key={`${tabsValue}_${build.title}`}
															build={build}
														/>
													))
											)}
										</div>
									)}
								</TabsContent>
							);
						})}
					</Tabs>
				</div>
			</main>
			<Card className="bg-muted mx-6">
				<CardHeader className="pb-3">
					<CardTitle>Help me to develop this website 🥰</CardTitle>
					<CardDescription className="text-balance leading-relaxed">
						Do not hesitate to contact me on Discord at @Vipalisk to
						discuss development and new functionalities.
					</CardDescription>
				</CardHeader>
				<CardFooter>༼ つ ◕_◕ ༽つ</CardFooter>
			</Card>
		</>
	);
}
