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
		<nav className="grid items-start gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={PAGE_PATH.HOME}
							className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8 hover:bg-accent hover:text-accent-foreground"
						>
							<Home className="h-5 w-5 group-hover:scale-110" />
							<span className="sr-only">Home</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Home</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={PAGE_PATH.DOCUMENTATION}
							className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8 hover:bg-accent hover:text-accent-foreground"
						>
							<Book className="h-5 w-5 group-hover:scale-110" />
							<span className="sr-only">Documentation</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Documentation</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={PAGE_PATH.DASHBOARD}
							className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors md:h-8 md:w-8 hover:bg-accent hover:text-accent-foreground"
						>
							<LayoutDashboard className="h-5 w-5 group-hover:scale-110" />
							<span className="sr-only">Dashboard</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Dashboard</TooltipContent>
				</Tooltip>

				{connectedUser && (
					<Tooltip>
						<TooltipTrigger
							asChild
							onClick={() => {
								router.push(
									`${PAGE_PATH.PROFILE}/${connectedUser.username.toLowerCase()}`
								);
							}}
						>
							<div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
								<User className="h-5 w-5" />
								<span className="sr-only">Profile</span>
							</div>
						</TooltipTrigger>
						<TooltipContent side="right">Profile</TooltipContent>
					</Tooltip>
				)}
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Settings className="h-5 w-5" />
							<span className="sr-only">Settings</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Settings</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</nav>
	);
}
