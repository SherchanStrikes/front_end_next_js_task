/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,

  images: {
    formats: ["image/webp"],

    remotePatterns: [
       
      {
        protocol: "https",

        hostname: "fakestoreapi.com",

        pathname: "/**",
      },
    ]
  },
};

module.exports = nextConfig;
