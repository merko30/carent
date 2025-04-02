import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SITE_URL: process.env.SITE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
  },
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
