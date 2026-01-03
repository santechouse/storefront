import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Specify the port your local API or server is running on
        pathname: "/**", // Allows any path
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.santechouse.uz",
      },
    ],
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
  },
};

export default withNextIntl(nextConfig);
