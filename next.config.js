/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    env: {
        NEXTAUTH_URL:
            process.env.VERCEL_ENV === "production" &&
            process.env.VERCEL_URL !== undefined
                ? "https://homesale.vercel.app"
                : process.env.VERCEL_URL !== undefined
                ? `https://${process.env.VERCEL_URL}`
                : process.env.NEXTAUTH_URL,

        NEXT_PUBLIC_NEXTAUTH_URL:
            process.env.VERCEL_ENV === "production" &&
            process.env.VERCEL_URL !== undefined
                ? "https://homesale.vercel.app"
                : process.env.VERCEL_URL !== undefined
                ? `https://${process.env.VERCEL_URL}`
                : process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    },
};

module.exports = nextConfig;
