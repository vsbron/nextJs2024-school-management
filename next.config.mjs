/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.prod.website-files.com",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
