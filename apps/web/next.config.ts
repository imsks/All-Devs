import type { NextConfig } from "next";

const apiOrigin = new URL(process.env.API_ORIGIN ?? "http://127.0.0.1:8787");

if (!["http:", "https:"].includes(apiOrigin.protocol) || apiOrigin.username || apiOrigin.password) {
  throw new Error("API_ORIGIN must be an HTTP(S) origin without credentials");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiOrigin.origin}/api/:path*` }];
  },
};

export default nextConfig;
