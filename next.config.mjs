/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vectorstock.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pngimg.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
