import type { NextConfig } from "next";
import withPayload from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
  },
};

export default withPayload(nextConfig);
