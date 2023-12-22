/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "digitalhippo.up.railway.app",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
