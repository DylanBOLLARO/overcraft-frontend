"use client";

import React, { createContext, useContext, useState } from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "../container";

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

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<ConnectedUserContextProvider>
					<Container>{children}</Container>
				</ConnectedUserContextProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
