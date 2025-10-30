import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    experimental: {
        turbopackFileSystemCacheForDev: true
    },
    reactCompiler: true
};

export default nextConfig;
