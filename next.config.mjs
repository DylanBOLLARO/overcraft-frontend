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

    async redirects() {
        return process.env.NODE_ENV === 'production'
            ? [
                  {
                      source: '/auth/login',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/login`,
                      permanent: false,
                  },
                  {
                      source: '/callback',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/callback`,
                      permanent: false,
                  },
                  {
                      source: '/auth/user',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/user`,
                      permanent: false,
                  },
                  {
                      source: '/auth/logout',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/logout`,
                      permanent: false,
                  },
              ]
            : []
    },
    async rewrites() {
        return process.env.NODE_ENV === 'production'
            ? []
            : [
                  {
                      source: '/auth/login',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/login`,
                  },
                  {
                      source: '/callback',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/callback`,
                  },
                  {
                      source: '/auth/user',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/user`,
                  },
                  {
                      source: '/auth/logout',
                      destination: `${process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL}/auth/logout`,
                  },
              ]
    },
}

export default nextConfig
