import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Next.js error prompt suggests this config
  allowedDevOrigins: ['172.26.14.37'],
};

export default nextConfig;
