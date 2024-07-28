"use client";

import React from "react";
import { cn } from "@/src/services/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../ui/tooltip";
import Link from "next/link";
import { PAGE_PATH } from "@/src/constants/enum";
import { Settings } from "lucide-react";

type SidebarProps = {
	className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
	return (
		<nav className={cn(`relative flex border-r z-10 pt-20`, className)}>
			<div className="flex flex-col p-2 gap-5">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={PAGE_PATH.HOME}
								className="group flex w-9 py-4 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex-col text-xl text-pretty font-mono leading-none"
							>
								{"HOME".split("").map((letter, index) => {
									return (
										<p key={`home_${index}_${letter}`}>
											{letter}
										</p>
									);
								})}
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Home</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={PAGE_PATH.DASHBOARD}
								className="group flex w-9 py-4 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex-col  text-xl text-pretty font-mono leading-none"
							>
								{"DASHBOARD".split("").map((letter, index) => {
									return (
										<p key={`dashboard_${index}_${letter}`}>
											{letter}
										</p>
									);
								})}
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>

					<div className="mt-auto">
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
								>
									<Settings className="h-5 w-5" />
									<span className="sr-only">Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								Settings
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			</div>
		</nav>
	);
}
