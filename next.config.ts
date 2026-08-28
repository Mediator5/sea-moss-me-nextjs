import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The ingredient library was renamed to Nature's Wisdom. Keep the old
      // path working for anything already linking to it.
      { source: "/ingredients", destination: "/natures-wisdom", permanent: true },
    ];
  },
};

export default nextConfig;
