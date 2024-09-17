/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "cdn.prod.website-files.com" }],
  },
};

export default nextConfig;
