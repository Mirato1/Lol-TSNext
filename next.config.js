/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['ddragon.leagueoflegends.com', 'ddragon.canisback.com', 'opgg-static.akamaized.net'],
	},
};

module.exports = nextConfig;
