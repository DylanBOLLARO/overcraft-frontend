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
import { BadgeInfo, ListFilter } from "lucide-react";
import { Button } from "../components/ui/button";
import { capitalize } from "../services/utils";
import { TAB_SELECTION } from "../constants/variable";
import DevelopThisWebsite from "../components/new/help-me-to-develop-this-website";
import { useBuilds } from "../services/queries";

export default function IndexPage() {
	const { isPending, error, data: builds, isFetching } = useBuilds();

	if (isPending) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<Tabs defaultValue="all">
				<div className="flex items-center">
					<TabsList>
						{TAB_SELECTION.map((tabsValue: string) => {
							return (
								<TabsTrigger value={tabsValue} key={tabsValue}>
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
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
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

				{TAB_SELECTION.map((tabsValue: string) => {
					return (
						<TabsContent value={tabsValue} key={tabsValue}>
							{!isFetching && (
								<div className="flex flex-wrap gap-5 mt-5">
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
			<DevelopThisWebsite />
		</div>
	);
}
