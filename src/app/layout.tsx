import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import Header from '@/components/header'
import { MainProvider } from '@/components/providers'
import { BackgroundColors } from '@/components/background-colors/background-colors'
import { Suspense } from 'react'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})
export const metadata: Metadata = {
    title: 'Overcraft',
    description:
        'Overcraft is an application that references all the builds orders for StarCraft 2.',
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)] `}
            >
                <MainProvider>
                    <Header />
                    <BackgroundColors />
                    {/* div below with "pt-[4rem]" cause Header has 64px height, to avoid unvisible content (below header)*/}
                    <div className="container mx-auto flex flex-1 flex-col pt-[4rem]">
                        <div className="py-5 px-2">
                            <Suspense>{children}</Suspense>
                        </div>
                    </div>
                </MainProvider>
            </body>
        </html>
    )
}
