"use client";

import "@/src/styles/globals.css";
import React from "react";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import Providers from "../components/layout/providers";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import { ScrollArea } from "../components/ui/scroll-area";

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className="select-none">
				<Providers>
					<>
						<Header />
						<div className="flex h-screen overflow-hidden">
							<Sidebar className="fixe" />
							<main className="flex-1 overflow-hidden pt-14">
								<ScrollArea className="h-full">
									{children}
								</ScrollArea>
							</main>
						</div>
					</>
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
