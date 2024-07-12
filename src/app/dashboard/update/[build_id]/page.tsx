"use client";

import { Icons } from "@/src/components/icons";
import { buttonVariants } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { pagePath } from "@/src/constants/enum";
import {
	get_all_step_build_by_build_id,
	get_connected_user_builds
} from "@/src/lib/networking";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "../../../../components/columns";
import { DataTable } from "../../../../components/data-table";
import { DialogEditBuild } from "@/src/components/DialogEditBuild";
import { DialogDeleteBuild } from "@/src/components/DialogDeleteBuild";
import ExportButton from "@/src/components/ExportButton";

export default function Page({ params }: { params: { build_id: string } }) {
	const [selectedUserBuild, setSelectedUserBuild] = useState<any>(null);
	const local_refresh_steps = async () => {
		const connected_user_builds = await get_connected_user_builds();
		const selected_user_build = await connected_user_builds.find(
			(x: any) => x.id == params.build_id
		);
		const stepsUnSort = await get_all_step_build_by_build_id(
			selected_user_build.id
		);
		const steps = stepsUnSort.sort(
			(a: any, b: any) => a.position - b.position
		);
		setSelectedUserBuild({ ...selected_user_build, steps });
	};

	useEffect(() => {
		(async () => {
			local_refresh_steps();
		})();
	}, [params]);

	if (!selectedUserBuild) return <></>;

	return (
		<div className="flex flex-col gap-5 flex-1 p-3">
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
				<div />

				<div className="flex flex-col items-center animate-fade animate-once animate-duration-300 gap-2">
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
				<div className="flex flex-row gap-2">
					<ExportButton selectedUserBuild={selectedUserBuild} />

					<DialogEditBuild
						selectedUserBuild={selectedUserBuild}
						local_refresh_steps={local_refresh_steps}
					/>

					<DialogDeleteBuild
						selectedUserBuildId={selectedUserBuild.id}
					/>
				</div>
			</div>
			<p className="text-muted-foreground">
				{selectedUserBuild.description}
			</p>
			<DataTable
				build_id={params.build_id}
				columns={columns}
				selectedUserBuild={selectedUserBuild}
				local_refresh_steps={local_refresh_steps}
			/>
		</div>
	);
}
