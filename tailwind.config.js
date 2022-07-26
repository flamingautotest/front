/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./partials/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				'cyan': '#ECFEFF',
				'pink': '#FECDD3',
			},
		},
	},
	plugins: [],
}
