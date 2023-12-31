const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
	mode: 'jit',
	content: [
		join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
		...createGlobPatternsForDependencies(__dirname),
	],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary-color)',
				accent: 'var(--accent-color)',
				warn: 'var(--warn-color)',
				success: 'var(--success-color)',
				warning: 'var(--warning-color)',
				error: 'var(--error-color)',
				'bp-black': '#242424',
				'bp-brown': {
					light: '#825941',
					DEFAULT: '#583b2a',
					dark: '#302118',
				},
			},
		},
	},
	important: true,
	variants: {
		extend: {},
	},
	plugins: [],
};
