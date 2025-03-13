'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../theme-provider'
import { AuthProvider, SearchProvider } from './context-provider'

export function MainProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    <SearchProvider>
                        <div className="flex min-h-screen w-full flex-col">
                            {children}
                        </div>
                    </SearchProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
