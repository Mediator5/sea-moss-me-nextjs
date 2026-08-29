import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The ingredient library was renamed to Nature's Wisdom. Keep the old
      // path working for anything already linking to it.
      { source: "/ingredients", destination: "/natures-wisdom", permanent: true },

      // The four jars were renamed in the 2026 brand refresh. Old product
      // URLs stay alive so links, ads and search results keep working.
      { source: "/products/super-green-emerald", destination: "/products/alkaline-me", permanent: true },
      { source: "/products/purple-power-bomb", destination: "/products/beets-and-berry-me", permanent: true },
      { source: "/products/golden-milk", destination: "/products/golden-me", permanent: true },
      { source: "/products/montego-tropical-fusion", destination: "/products/tropical-me", permanent: true },
    ];
  },
};

export default nextConfig;
