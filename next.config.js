/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        HARVEST_API_URL: process.env.HARVEST_API_URL,
        OAUTH_APP_ID: process.env.OAUTH_APP_ID,
    },
}

module.exports = nextConfig
