/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";


const nextConfig = {
    basePath: isProd ? "/overcraft" : "",
    output: isProd ? "standalone" : null,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: "localhost"
            }
        ]
    }
};
export default nextConfig;