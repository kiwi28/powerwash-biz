import type { NextConfig } from "next";
import withPayload from "@payloadcms/next/withPayload";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
  },
};

export default withPayload(withNextIntl(nextConfig));
