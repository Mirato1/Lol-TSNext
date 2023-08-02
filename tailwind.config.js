/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Colores para tema claro
				primary: '#2D3552', // Color principal
				secondary: '#BFD2E7', // Color secundario
				highlight: '#5E78BD', // Color de resaltado
				accent: '#80ADDC', // Color complementario

				// Colores para tema oscuro
				darkPrimary: '#251E21', // Color principal oscuro
				darkSecondary: '#AF8085', // Color secundario oscuro
				darkHighlight: '#888896', // Color de resaltado oscuro
				darkAccent: '#8A959B', // Color complementario oscuro
			},
		},
	},
};
