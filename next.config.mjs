/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
                search: '',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/auth/logout',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/logout`,
            },
            {
                source: '/auth/login',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/login`,
            },
            {
                source: '/auth/user',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/user`,
            },
            {
                source: '/callback',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/callback`,
            },
        ]
    },
}

export default nextConfig
