import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		API_TOKEN: process.env.API_TOKEN,
	},
};

export default nextConfig;
