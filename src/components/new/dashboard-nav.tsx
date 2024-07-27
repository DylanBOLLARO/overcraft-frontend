"use client";

import Link from "next/link";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../ui/tooltip";
import { PAGE_PATH } from "@/src/constants/enum";
import { Book, Home, LayoutDashboard, Settings, User } from "lucide-react";
import { useConnectedUserContext } from "../layout/providers";
import { useRouter } from "next/navigation";

export function DashboardNav() {
	const { connectedUser } = useConnectedUserContext();
	const router = useRouter();

	return (
		<nav className="flex flex-col p-2 gap-5">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={PAGE_PATH.HOME}
							className="group flex w-9 py-4 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground flex-col text-xl text-pretty font-mono leading-none"
						>
							{"HOME".split("").map((letter) => {
								return <p>{letter}</p>;
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
							{"DASHBOARD".split("").map((letter) => {
								return <p>{letter}</p>;
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
						<TooltipContent side="right">Settings</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</nav>
	);
}
