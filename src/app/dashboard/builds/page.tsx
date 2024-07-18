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
import { useAllBuildsOfUser } from "@/src/services/queries";

export default function Page() {
	const { data: builds, isFetching: isFetchingBuild } = useAllBuildsOfUser();

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-row gap-4 justify-end">
					<ImportButton />
					<DialogCreateBuild />
				</div>
				<div className="flex flex-col gap-1 p-1 border rounded">
					{builds?.length > 0 ? (
						builds.map((build: any) => {
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
			</div>
		</main>
	);
}
