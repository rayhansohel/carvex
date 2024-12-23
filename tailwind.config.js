/* eslint-disable no-undef */
module.exports = {
	content: [
	  "./src/**/*.{html,js,jsx,ts,tsx}",
	],
	theme: {
	  extend: {
		fontFamily: {
			'antonio': ['Antonio', 'serif'],
			'poppins': ['Poppins', 'serif'],
		  },
	  },
	},
	daisyui: {
	  themes: [
		{
		  light: {
			"primary": "#3f3f46",        
			"secondary": "#ff0055",
			"accent": "#ea580c", 
			"neutral": "#52525b",
			"base-100": "#fafafa",
			"base-200": "#f4f4f5",
			"base-300": "#e4e4e7",
			"info": "#4f46e5",
			"success": "#059669",
			"warning": "#ea580c",
			"error": "#e11d48",
		  },
		  dark: {
			"primary": "#d4d4d8",
			"secondary": "#ff0055",
			"accent": "#ea580c",
			"neutral": "#52525b",
			"base-100": "#09090b",
			"base-200": "#18181b",
			"base-300": "#27272a",
			"info": "#4f46e5",
			"success": "#059669",
			"warning": "#ea580c",
			"error": "#e11d48",
		  },
		},
	  ],
	},
	plugins: [require('daisyui')],
  }
  