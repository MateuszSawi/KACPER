import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statyczny eksport -> `npm run build` generuje folder `out/`
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,

  sassOptions: {
    loadPaths: [path.join(process.cwd(), "src/styles")],
    // Zmienne, funkcje i mixiny dostępne automatycznie w każdym pliku .scss
    additionalData: `@use "abstracts" as *;`,
  },
};

export default nextConfig;
