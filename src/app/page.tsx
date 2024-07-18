"use client";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "../components/ui/tabs";
import Header from "../components/header";
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
import { File, ListFilter } from "lucide-react";
import { Button } from "../components/ui/button";

export default function IndexPage() {
	const { isPending, error, data: builds, isFetching } = useBuilds();

	if (isPending) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		!isFetching && (
			<>
				{/* <Header /> */}
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
						<Tabs defaultValue="all">
							<div className="flex items-center">
								<TabsList>
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="terran">
										Terran
									</TabsTrigger>
									<TabsTrigger value="zerg">Zerg</TabsTrigger>
									<TabsTrigger value="protoss">
										Protoss
									</TabsTrigger>
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
								</div>
							</div>

							{["all", "terran", "zerg", "protoss"].map(
								(tabsValue: string) => {
									return (
										<TabsContent
											value={tabsValue}
											key={tabsValue}
										>
											<div className="flex flex-wrap gap-5 mt-5">
												{builds
													.filter((build: any) => {
														if (tabsValue === "all")
															return true;
														return (
															build.race?.toUpperCase() ==
															tabsValue?.toUpperCase()
														);
													})
													.map((build: any) => (
														<CardDisplayBuild
															key={`${tabsValue}_${build.title}`}
															build={build}
														/>
													))}
											</div>
										</TabsContent>
									);
								}
							)}
						</Tabs>

						{/* <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
						<Card
							className="sm:col-span-2"
							x-chunk="dashboard-05-chunk-0"
						>
							<CardHeader className="pb-3">
								<CardTitle>Your Orders</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Introducing Our Dynamic Orders Dashboard for
									Seamless Management and Insightful Analysis.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button>Create New Order</Button>
							</CardFooter>
						</Card>
					</div> */}
					</div>
				</main>
			</>
		)
	);
}
