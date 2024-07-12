"use client";

import { Sidebar } from "@/src/components/sidebar";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/src/components/ui/tabs";
import { RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { VIEW } from "@/src/constants/enum";

import { CardBuild } from "@/src/components/CardBuild";
import { get_connected_user_builds } from "@/src/lib/networking";
import { DialogCreateBuild } from "@/src/components/DialogCreateBuild";
import { ImportButton } from "@/src/components/ImportButton";

export default function Page() {
	const [userBuilds, setUserBuilds] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const local_refresh_builds = async () => {
		try {
			setIsLoading(true);
			setUserBuilds(await get_connected_user_builds());
		} catch (error) {
			console.error("Error fetching user builds:", error);
		} finally {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	};

	useEffect(() => {
		local_refresh_builds();
	}, []);

	return (
		<div className="flex flex-row flex-1 h-full gap-3">
			<Sidebar />
			<Tabs defaultValue={`${VIEW.BUILD}`} className="flex-1 py-2 ">
				<div className="flex flex-row gap-5">
					<TabsList>
						<TabsTrigger
							value={`${VIEW.BUILD}`}
							className="relative"
						>
							Builds
						</TabsTrigger>
						<TabsTrigger value={`${VIEW.DRAFT}`} disabled>
							Drafts
						</TabsTrigger>
					</TabsList>
					<Button
						variant={"outline"}
						onClick={local_refresh_builds}
						className="gap-2"
					>
						<RefreshCcw
							className={`h-4 w-4 ${
								isLoading &&
								"animate-spin animate-once animate-reverse"
							}`}
						/>
						Refresh
					</Button>

					<DialogCreateBuild
						local_refresh_builds={local_refresh_builds}
					/>
					<ImportButton local_refresh_builds={local_refresh_builds} />
				</div>
				<TabsContent
					value={`${VIEW.BUILD}`}
					className="h-[calc(100%-49px)]"
				>
					<ScrollArea className="border rounded h-full">
						<div className="flex flex-col gap-1 p-1">
							{userBuilds?.length > 0 ? (
								userBuilds.map((build: any) => {
									return (
										<CardBuild
											className={`animate-fade animate-once animate-duration-300`}
											build={build}
											key={build.id}
											width={120}
											height={120}
										/>
									);
								})
							) : (
								<p className="p-5">
									You have not yet created a build order.
								</p>
							)}
						</div>
					</ScrollArea>
				</TabsContent>
			</Tabs>
		</div>
	);
}
