import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'oklch(1 0 0)',
				foreground: 'oklch(0.141 0.005 285.823)',
				card: 'oklch(1 0 0)',
				'card-foreground': 'oklch(0.141 0.005 285.823)',
				popover: 'oklch(1 0 0)',
				'popover-foreground': 'oklch(0.141 0.005 285.823)',
				primary: 'oklch(0.21 0.006 285.885)',
				'primary-foreground': 'oklch(0.985 0 0)',
				secondary: 'oklch(0.967 0.001 286.375)',
				'secondary-foreground': 'oklch(0.21 0.006 285.885)',
				muted: 'oklch(0.967 0.001 286.375)',
				'muted-foreground': 'oklch(0.552 0.016 285.938)',
				accent: 'oklch(0.967 0.001 286.375)',
				'accent-foreground': 'oklch(0.21 0.006 285.885)',
				destructive: 'oklch(0.577 0.245 27.325)',
				border: 'oklch(0.92 0.004 286.32)',
				input: 'oklch(0.92 0.004 286.32)',
				ring: 'oklch(0.705 0.015 286.067)',
				'chart-1': 'oklch(0.646 0.222 41.116)',
				'chart-2': 'oklch(0.6 0.118 184.704)',
				'chart-3': 'oklch(0.398 0.07 227.392)',
				'chart-4': 'oklch(0.828 0.189 84.429)',
				'chart-5': 'oklch(0.769 0.188 70.08)',
				'sidebar': 'oklch(0.985 0 0)',
				'sidebar-foreground': 'oklch(0.141 0.005 285.823)',
				'sidebar-primary': 'oklch(0.21 0.006 285.885)',
				'sidebar-primary-foreground': 'oklch(0.985 0 0)',
				'sidebar-accent': 'oklch(0.967 0.001 286.375)',
				'sidebar-accent-foreground': 'oklch(0.21 0.006 285.885)',
				'sidebar-border': 'oklch(0.92 0.004 286.32)',
				'sidebar-ring': 'oklch(0.705 0.015 286.067)',
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 4px)',
				md: 'calc(var(--radius) - 2px)',
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) + 4px)',
			},
			fontFamily: {
				sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
				serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
				mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"],
				intertight: ['"Inter Tight"', 'sans-serif'],
				kanit: ['Kanit', 'sans-serif'],
			},
			animation: {
				shine: 'shine var(--duration) infinite linear'
			},
			keyframes: {
				shine: {
					'0%': {
						'background-position': '0% 0%'
					},
					'50%': {
						'background-position': '100% 100%'
					},
					to: {
						'background-position': '0% 0%'
					}
				}
			}
		}
	},
	darkMode: "class",
	plugins: [nextui()],
};