/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    domains: ['res.cloudinary.com'], // ✅ এখানে থাকবে, nested না
  },
}

module.exports = nextConfig
