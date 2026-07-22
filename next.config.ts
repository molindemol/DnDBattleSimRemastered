import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: ["./src/styles"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dndbeyond.com",
      },
    ],
  },
};

export default nextConfig;
