"use client";

import Link from "next/link";
import { PAGE_PATH } from "../../constants/enum";
import { Book, Home, LayoutDashboard, Settings, User } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../ui/tooltip";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/src/app/layout";

export default function Navigation() {
	const router = useRouter();
	const { user } = useUserContext();

	return (
		<div className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-transparent flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={PAGE_PATH.HOME}
								className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
								className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Book className="h-5 w-5 group-hover:scale-110" />
								<span className="sr-only">Documentation</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">
							Documentation
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={PAGE_PATH.DASHBOARD}
								className="group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LayoutDashboard className="h-5 w-5 group-hover:scale-110" />
								<span className="sr-only">Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Dashboard</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
			<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
				<TooltipProvider>
					{user && (
						<Tooltip>
							<TooltipTrigger
								asChild
								onClick={() => {
									router.push(
										`${PAGE_PATH.PROFILE}/${user.username.toLowerCase()}`
									);
								}}
							>
								<div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
									<User className="h-5 w-5" />
									<span className="sr-only">Profile</span>
								</div>
							</TooltipTrigger>
							<TooltipContent side="right">
								Profile
							</TooltipContent>
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
		</div>
	);
}
