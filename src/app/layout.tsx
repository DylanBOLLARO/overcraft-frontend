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
const UserContext = createContext<any>(undefined);

export const UserContextProvider = ({ children }: any) => {
	const [user, setUser] = useState<string | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const userContext = useContext(UserContext);
	if (userContext === undefined) {
		throw new Error(
			"useOnboardingContext must be inside a OnboardingProvider"
		);
	}
	return userContext;
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
						<UserContextProvider>
							<Container>
								<Navigation />
								<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
									<Header />
									{children}
								</div>
								<TailwindIndicator />
							</Container>
						</UserContextProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
