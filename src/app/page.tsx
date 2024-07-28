"use client";

import { Frown, Swords } from "lucide-react";
import { Button } from "../components/ui/button";
import { capitalize } from "../services/utils";
import { TAB_SELECTION } from "../constants/variable";
import { useBuilds } from "../services/queries";
import { BuildItem } from "../components/new/build-item";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "../components/ui/select";
import { useState, useEffect } from "react";
import qs from "qs";
import { Input } from "../components/ui/input";
import { BuildsList } from "../components/new/builds-list";
import { NoBuildsFound } from "../components/new/no-builds-found";

export default function IndexPage() {
	const stringifyParamsForSearch = (params: any) => {
		return qs.stringify(params);
	};

	const defaultValueSearchFilterSearchBuilds = {
		q: "",
		type: "all",
		difficulty: "all",
		race: "all",
		v_race: "all",
		sorted: "mostlike"
	};

	const [filterSearchBuilds, setFilterSearchBuilds] = useState(
		defaultValueSearchFilterSearchBuilds
	);

	const {
		isLoading,
		error,
		data: builds,
		isFetching,
		refetch
	} = useBuilds(stringifyParamsForSearch(filterSearchBuilds));

	useEffect(() => {
		refetch();
	}, [filterSearchBuilds]);

	if (isLoading) return;
	if (error) return console.error("An error has occurred: " + error.message);

	return (
		<div className="flex-1 flex flex-col gap-5 p-5">
			<div className="flex items-center gap-4">
				<Select
					value={filterSearchBuilds.race}
					onValueChange={(event) => {
						setFilterSearchBuilds((prev) => ({
							...prev,
							race: event
						}));
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All" />
					</SelectTrigger>
					<SelectContent>
						{TAB_SELECTION.map((tabsValue: string) => {
							return (
								<SelectItem
									key={`race_${tabsValue}`}
									value={tabsValue}
								>
									{capitalize(tabsValue)}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
				<Swords className="opacity-75" />
				<Select
					value={filterSearchBuilds.v_race}
					onValueChange={(event) => {
						setFilterSearchBuilds((prev) => ({
							...prev,
							v_race: event
						}));
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All" />
					</SelectTrigger>
					<SelectContent>
						{TAB_SELECTION.map((tabsValue: string) => {
							return (
								<SelectItem
									key={`v_race_${tabsValue}`}
									value={tabsValue}
								>
									{capitalize(tabsValue)}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>

				<Select
					value={filterSearchBuilds.type}
					onValueChange={(event) => {
						setFilterSearchBuilds((prev) => ({
							...prev,
							type: event
						}));
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All Types" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="macro">Macro</SelectItem>
						<SelectItem value="cheese">Cheese</SelectItem>
						<SelectItem value="allin">All-in</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filterSearchBuilds.difficulty}
					onValueChange={(event) => {
						setFilterSearchBuilds((prev) => ({
							...prev,
							difficulty: event
						}));
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All Stars" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Stars</SelectItem>
						<SelectItem value="1">1 Star</SelectItem>
						<SelectItem value="2">2 Stars</SelectItem>
						<SelectItem value="3">3 Stars</SelectItem>
					</SelectContent>
				</Select>

				<div className="flex w-full max-w-sm items-center space-x-2">
					<Input
						type="email"
						placeholder="Search a build..."
						onChange={(event) => {
							setFilterSearchBuilds((prev) => ({
								...prev,
								q: event.target.value
							}));
						}}
						value={filterSearchBuilds.q}
					/>
				</div>

				{qs.stringify(filterSearchBuilds) !==
					qs.stringify(defaultValueSearchFilterSearchBuilds) && (
					<Button
						className="relative"
						variant={"default"}
						onClick={() =>
							setFilterSearchBuilds(
								defaultValueSearchFilterSearchBuilds
							)
						}
					>
						Reset
					</Button>
				)}

				<div className="ml-auto flex items-center gap-2">
					<Select
						value={filterSearchBuilds.sorted}
						onValueChange={(event) => {
							setFilterSearchBuilds((prev) => ({
								...prev,
								sorted: event
							}));
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Most liked" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="mostlike">Most liked</SelectItem>
							<SelectItem value="mostdifficult">
								Most difficult
							</SelectItem>
							<SelectItem value="leastdifficult">
								Least difficult
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{!isFetching && builds?.length > 0 ? (
				<BuildsList builds={builds} />
			) : (
				<NoBuildsFound />
			)}
		</div>
	);
}
