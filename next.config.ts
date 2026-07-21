import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.26",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.1.26",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.26'],
};

export default nextConfig;
