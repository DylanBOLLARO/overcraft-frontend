"use client";

import localFont from "next/font/local";

import "@/src/styles/globals.css";
import { cn } from "@/src/lib/utils";
import { Toaster } from "@/src/components/ui/toaster";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import { ThemeProvider } from "@/src/components/theme-provider";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import {
	deleteCookie,
	getCookie,
	get_connected_user_id
} from "../lib/networking";
import { usePathname } from "next/navigation";
import router from "next/router";
import { pagePath } from "../constants/enum";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	const [userId, setUserId] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		(async () => {
			const user_id = await get_connected_user_id();
			setUserId(await user_id);
			if (!user_id) {
				await deleteCookie();
			}
		})();
		setIsLoading(false);
	}, [userId, pathname]);

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"h-[calc(100vh-49px)] bg-background font-sans antialiased animate-fade animate-once animate-duration-[500ms] animate-ease-out "
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Navigation userId={userId} />
					<main className="flex flex-row px-2 pb-2 gap-2 h-full">
						{!isLoading && children}
					</main>
					<TailwindIndicator />
				</ThemeProvider>
			</body>
		</html>
	);
}
