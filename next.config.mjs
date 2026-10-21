/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Trim response headers and keep the served payload lean.
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Tree-shake icon/form packages so only the pieces we import ship to the
    // browser (keeps the shared bundle smaller on slow mobile connections).
    optimizePackageImports: ["lucide-react", "@hookform/resolvers"],
  },
  images: {
    // All photography is served from the Wix media CDN. A custom loader lets us
    // request exactly-sized WebP renditions straight from Wix (no double processing).
    loader: "custom",
    loaderFile: "./image-loader.js",
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
};

export default nextConfig;
