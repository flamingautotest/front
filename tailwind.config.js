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
				'red': '#FF3344',
				'green': '#10E5A5',
				'yellow': '#FFCB1F',
				'blue': '#4281FD',
			},
		},
	},
	plugins: [],
}
