/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Uploads de vídeo do admin passam pelas server actions; o padrão (1MB) é baixo demais.
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
