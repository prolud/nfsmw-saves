import type { NextConfig } from "next";

// Quando publicado no GitHub Pages (project site), o site vive em
// https://<usuario>.github.io/<repositorio>/. O workflow define
// NEXT_PUBLIC_BASE_PATH=/<repositorio> e o código usa withBase() para prefixar assets.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
