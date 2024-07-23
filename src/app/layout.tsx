"use client";

import "@/src/styles/globals.css";
import React, { createContext, useContext, useState } from "react";
import { TailwindIndicator } from "@/src/components/tailwind-indicator";
import { ThemeProvider } from "@/src/components/theme-provider";
import Navigation from "../components/new/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/header";
import Container from "../components/container";

interface RootLayoutProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient();
const ConnectedUserContext = createContext<any>(undefined);

export const ConnectedUserContextProvider = ({ children }: any) => {
	const [connectedUser, setConnectedUser] = useState<string | null>(null);

	return (
		<ConnectedUserContext.Provider
			value={{ connectedUser, setConnectedUser }}
		>
			{children}
		</ConnectedUserContext.Provider>
	);
};

export const useConnectedUserContext = () => {
	const connectedUserContext = useContext(ConnectedUserContext);
	if (connectedUserContext === undefined) {
		throw new Error(
			"useConnectedUserContext must be inside a ConnectedUserContextProvider"
		);
	}
	return connectedUserContext;
};

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
						<ConnectedUserContextProvider>
							<Container>
								<Navigation />
								<div className="flex flex-col gap-4 py-4 pl-14">
									<Header />
									<main className="flex flex-col gap-4 px-4">
										{children}
									</main>
								</div>
								<TailwindIndicator />
							</Container>
						</ConnectedUserContextProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
