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
                source: '/logout',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/logout`,
            },
            {
                source: '/login',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/login`,
            },
            {
                source: '/user',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/user`,
            },
            {
                source: '/callback',
                destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/callback`,
            },
        ]
    },
}

export default nextConfig
