export const API = process.env.API_URL;
export const URL_IMG_PATCH = `${process.env.API_URL}${process.env.API_PATCH}/img`;
export const URL_IMG = `${process.env.API_URL}img`;
export const URL_DATA = `${process.env.API_URL}${process.env.API_PATCH}/data/en_US/`;

export const headerLinks = [
	{ url: '/', title: 'Inicio' },
	{ url: '/profile', title: 'Perfil' },
	{ url: '/mains', title: 'Mains' },
	{ url: '/builds', title: 'Builds' },
];
