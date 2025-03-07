'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './context-provider/auth-context'

export function MainProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 3, retryDelay: 1000 } },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className="flex min-h-screen w-full flex-col">
                    {children}
                </div>
            </AuthProvider>
        </QueryClientProvider>
    )
}
