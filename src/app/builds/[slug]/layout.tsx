'use client'

import { StopwatchProvider } from '@/components/providers/context-provider'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <StopwatchProvider>{children}</StopwatchProvider>
}
