"use client";

import "@/src/styles/globals.css";
import React from "react";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import Providers from "../components/layout/providers";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";

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
							<Sidebar />
							<main className="flex-1 flex flex-col overflow-hidden pt-[76px] p-5 gap-5">
								{children}
							</main>
						</div>
					</>
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
