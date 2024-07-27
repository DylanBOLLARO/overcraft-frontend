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
		<nav className={cn(`relative  flex border-r z-10 pt-20`, className)}>
			<DashboardNav />
		</nav>
	);
}
