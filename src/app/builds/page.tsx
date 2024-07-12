"use client";

import { AlbumArtwork } from "@/src/components/album-artwork";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/src/components/ui/tabs";
import { get_all_publics_builds } from "@/src/lib/networking";
import React, { useEffect, useState } from "react";

const Page = () => {
	const [allBuilds, setAllBuilds] = useState([]);

	const get_all_public_builds = async () => {
		setAllBuilds(await get_all_publics_builds());
	};

	useEffect(() => {
		get_all_public_builds();
	}, []);

	if (!allBuilds) return <></>;

	return (
		<Tabs defaultValue="all" className="flex-1">
			<TabsList className="flex mx-auto max-w-min">
				<TabsTrigger disabled value="popular">
					Most popular
				</TabsTrigger>
				<TabsTrigger value="all">All builds</TabsTrigger>
			</TabsList>
			<TabsContent value="popular">Most popular</TabsContent>
			<TabsContent value="all" className="border-none p-0 outline-none">
				<div className="relative">
					<ScrollArea>
						<div className="flex flex-wrap gap-3">
							{allBuilds.map((build: any) => {
								return (
									<AlbumArtwork
										key={build.id}
										build={build}
										className={`w-[100px] animate-fade animate-once animate-duration-300`}
										aspectRatio="square"
										width={150}
										height={150}
									/>
								);
							})}
						</div>
					</ScrollArea>
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default Page;
