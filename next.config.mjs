/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/destination/:slug',
        destination: '/product/:slug',
      },
      {
        source: '/destinations/:city',
        destination: '/City/:city',
      },
      {
        source: '/businesses/:city',
        destination: '/CtiyBusiness/:city',
      },
      {
        source: '/businesscities',
        destination: '/Citeis',
      },
      {
        source: '/destinationcities',
        destination: '/Cities',
      },
      {
        source: '/my-products',
        destination: '/My-Destinations',
      },
      {
        source: '/new-destination',
        destination: '/new-product',
      },
      {
        source: '/:city/destination/:slug',
        destination: '/destination/:slug',
      },
       {
        source: '/businesses/:city',
        destination: '/CtiyBusiness/:city',
      }
    ];
  },
};

export default nextConfig;
