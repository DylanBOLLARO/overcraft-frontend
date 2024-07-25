"use client";

import React from "react";
import { cn } from "@/src/services/utils";
import { navItems } from "@/src/constants/variable";
import { DashboardNav } from "../new/dashboard-nav";

type SidebarProps = {
	className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
	return (
		<nav
			className={cn(
				`relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
				className
			)}
		>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<div className="mt-3 space-y-1">
						<DashboardNav />
					</div>
				</div>
			</div>
		</nav>
	);
}
