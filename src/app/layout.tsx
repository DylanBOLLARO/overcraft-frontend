"use client";

import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import { ThemeProvider } from "@/src/components/theme-provider";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { deleteCookie, get_connected_user_id } from "../lib/networking";
import { usePathname } from "next/navigation";
import { Button } from "../components/ui/button";
import {
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	Search,
	ShoppingCart,
	Users2
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "../components/ui/breadcrumb";
import { Input } from "../components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import Image from "next/image";
import Header from "../components/header";

import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query";

interface RootLayoutProps {
	children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className="select-none">
				<QueryClientProvider client={queryClient}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
					>
						<Navigation />
						<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
							{children}
						</div>
						<TailwindIndicator />
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
