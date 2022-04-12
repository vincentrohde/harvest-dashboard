/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isProd ? './' : '',
    env: {
        HARVEST_API_URL: process.env.HARVEST_API_URL,
        OAUTH_APP_ID: process.env.OAUTH_APP_ID,
    },
}

module.exports = nextConfig
