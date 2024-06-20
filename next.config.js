/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_URL:
            process.env.VERCEL_ENV === "production" &&
            process.env.VERCEL_URL !== undefined
                ? `https://balabeit.vercel.app`
                : process.env.VERCEL_URL !== undefined
                  ? `https://${process.env.VERCEL_URL}`
                  : process.env.NEXTAUTH_URL,

        NEXT_PUBLIC_NEXTAUTH_URL:
            process.env.VERCEL_ENV === "production" &&
            process.env.VERCEL_URL !== undefined
                ? "https://balabeit.vercel.app"
                : process.env.VERCEL_URL !== undefined
                  ? `https://${process.env.VERCEL_URL}`
                  : process.env.NEXT_PUBLIC_NEXTAUTH_URL,
    },
};

module.exports = nextConfig;
