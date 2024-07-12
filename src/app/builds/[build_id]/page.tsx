"use client";
import ExportButton from "@/src/components/ExportButton";
import { Icons } from "@/src/components/icons";
import { buttonVariants } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "@/src/components/ui/table";
import { pagePath } from "@/src/constants/enum";
import {
	get_all_step_build_by_build_id,
	get_public_build_by_id
} from "@/src/lib/networking";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { build_id: string } }) {
	const [selectedUserBuild, setSelectedUserBuild] = useState<any>(null);

	const local_refresh_steps = async () => {
		const public_build = await get_public_build_by_id(+params.build_id);

		const public_build_steps = await get_all_step_build_by_build_id(
			public_build.id
		);
		const steps = public_build_steps.sort(
			(a: any, b: any) => a.position - b.position
		);
		setSelectedUserBuild({ ...public_build, steps });
	};

	useEffect(() => {
		(async () => {
			local_refresh_steps();
		})();
	}, [params]);

	if (!selectedUserBuild) return <></>;

	return (
		<div className="flex flex-col gap-5 flex-1 p-3">
			<div className="flex flex-row gap-5">
				<Link
					href={pagePath.BUILDS}
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
				<div className="flex flex-col items-center animate-fade animate-once animate-duration-300 gap-2 mx-auto">
					<h2 className="font-medium leading-none self-center">
						{selectedUserBuild.title}
					</h2>
					<div className="flex text-xs gap-2 font-mono text-muted-foreground">
						<p className="animate-fade animate-once animate-duration-300 animate-delay-500">
							{selectedUserBuild.race}
						</p>
						<Separator
							className="animate-fade animate-once animate-duration-300 animate-delay-[2000ms]"
							orientation="vertical"
						/>
						<p className="animate-fade animate-once animate-duration-300 animate-delay-[1000ms]">
							VS
						</p>
						<Separator
							className="animate-fade animate-once animate-duration-300 animate-delay-[2000ms]"
							orientation="vertical"
						/>
						<p className="animate-fade animate-once animate-duration-300 animate-delay-[1500ms]">
							{selectedUserBuild.v_race}
						</p>
					</div>
				</div>
			</div>
			<p className="text-muted-foreground">
				{selectedUserBuild.description}
			</p>

			<Table className="animate-fade animate-once animate-duration-300">
				<TableHeader>
					<TableRow>
						<TableHead>Description</TableHead>
						<TableHead>Population</TableHead>
						<TableHead>Timer</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{selectedUserBuild.steps.map((step: any) => (
						<TableRow key={step.invoice}>
							<TableCell className="font-medium">
								{step.description}
							</TableCell>
							<TableCell>{step.population}</TableCell>
							<TableCell>{step.timer}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
