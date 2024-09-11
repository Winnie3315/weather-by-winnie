/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
          protocol: 'https',
          hostname: 'cdn.worldweatheronline.com',
          port: '',
          pathname: '/images/wsymbols01_png_64/images/wsymbols01_png_64/**',
      },
  ],
  }
};


export default nextConfig;
