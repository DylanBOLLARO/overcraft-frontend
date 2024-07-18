"use client";

import Link from "next/link";

import { marketingConfig } from "@/src/config/navigation";
import { cn } from "@/src/lib/utils";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { ModeToggle } from "@/src/components/mode-toggle";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "../ui/alert-dialog";
import { pagePath } from "../../constants/enum";
import { MainNav } from "../main-nav";
import { useRouter } from "next/navigation";
import { deleteCookie } from "../../lib/networking";
import {
	Book,
	Home,
	LayoutDashboard,
	LineChart,
	Package,
	Package2,
	Settings,
	ShoppingCart,
	Users2
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "../ui/tooltip";

export default function NavigationBar() {
	const router = useRouter();

	return (
		<div className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-transparent flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href={pagePath.HOME}
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
								href={pagePath.DOCUMENTATION}
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
								href={pagePath.DASHBOARD}
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
