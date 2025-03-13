import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import Header from '@/components/header'
import { MainProvider } from '@/components/providers'

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
        'Overcraft is an application that references all the build orders for StarCraft 2.',
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
                    <div className="absolute w-20 h-52 bg-indigo-700 blur-[250px] translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute right-0 w-52 h-20 bg-blue-700 blur-[250px] -translate-x-1/2 translate-y-1/2"></div>
                    <div className="container mx-auto flex flex-1 flex-col pt-[4rem]">
                        <div className="py-5 px-2">{children}</div>
                    </div>
                </MainProvider>
            </body>
        </html>
    )
}
