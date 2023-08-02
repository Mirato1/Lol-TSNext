/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['ddragon.leagueoflegends.com'],
	},
};

module.exports = nextConfig;
