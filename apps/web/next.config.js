/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/services", "@repo/trpc", "octokit"],
};

export default nextConfig;
