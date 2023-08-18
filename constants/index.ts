export const API = process.env.NEXT_PUBLIC_API_URL;
export const URL_IMG_PATCH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img`;
export const URL_IMG = `${process.env.NEXT_PUBLIC_API_URL}img`;
export const URL_DATA = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/data/en_US/`;

export const headerLinks = [
	{ url: '/', title: 'Inicio' },
	{ url: '/profile', title: 'Perfil' },
	{ url: '/mains', title: 'Mains' },
	{ url: '/builds', title: 'Builds' },
];

export const items = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'];

export const spells = [
	{
		id: 6,
		name: 'SummonerGhost',
	},
	{
		id: 4,
		name: 'SummonerFlash',
	},
	{
		id: 3,
		name: 'SummonerExhaust',
	},
	{
		id: 1,
		name: 'SummonerBoost',
	},
	{
		id: 14,
		name: 'SummonerDot',
	},
	{
		id: 12,
		name: 'SummonerTeleport',
	},
];

export const seasonElo = [
	// {
	// 	season: 3,
	// 	elo: 'Plata',
	// 	color: 'text-gray-400',
	// },
	// {
	// 	season: 4,
	// 	elo: 'Oro',
	// 	color: 'text-yellow-700',
	// },
	// {
	// 	season: 5,
	// 	elo: 'Diamante',
	// 	color: 'text-cyan-400',
	// },
	// {
	// 	season: 6,
	// 	elo: 'Diamante',
	// 	color: 'text-cyan-400',
	// },
	// {
	// 	season: 7,
	// 	elo: 'Master',
	// 	color: 'text-purple-500',
	// },
	// {
	// 	season: 8,
	// 	elo: 'Master',
	// 	color: 'text-purple-500',
	// },
	{
		season: 9,
		elo: 'Challenger',
		color: 'text-yellow-500',
	},
	{
		season: 10,
		elo: 'Challenger',
		color: 'text-yellow-500',
	},
	{
		season: 11,
		elo: 'Challenger',
		color: 'text-yellow-500',
	},
	{
		season: 12,
		elo: 'Challenger',
		color: 'text-yellow-500',
	},
	{
		season: 13,
		elo: 'Challenger',
		color: 'text-yellow-500',
	},
];

export const mains = [
	'Aatrox',
	'Jayce',
	'Gangplank',
	'Yasuo',
	'Yone',
	'Kled',
	'Camille',
	'Sylas',
	'Akshan',
	'Riven',
	'LeeSin',
	'Pantheon',
	'Kennen',
	'Irelia',
	'Vladimir',
	'Ryze',
	'Fiora',
	'Gnar',
	'Gwen',
	'Sett',
	'Akali',
];
