
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// PayCard Design System Colors
				paycard: {
					// Brand Colors
					salmon: '#F47A71',
					navy: '#0F1F38',
					white: '#FFFFFF',
					// Status Colors
					blue: '#6C87BC',
					green: '#8CBC85',
					orange: '#F8BE53',
					red: '#F17173',
					// Navy Shades
					'navy-900': '#183358',
					'navy-800': '#224780',
					'navy-700': '#2C58A5',
					'navy-600': '#366FC9',
					'navy-500': '#5A88D3',
					'navy-400': '#7FA4DD',
					'navy-300': '#A4A8E7',
					'navy-200': '#C8DBF0',
					'navy-150': '#EDF2FA',
					'navy-100': '#F6F9FD',
				},
				// New colors from the provided design system
				pcard: {
					// Blues
					'dark-blue': '#0F1F38',     // Darkest navy blue
					'blue-900': '#183358',      // Very dark blue
					'blue-800': '#224780',      // Dark blue
					'blue-700': '#2C58A5',      // Medium-dark blue
					'blue-600': '#366FC9',      // Medium blue
					'blue-500': '#5A88D3',      // Medium blue
					'blue-400': '#7FA4DD',      // Light-medium blue
					'blue-300': '#A4A8E7',      // Light blue
					'blue-200': '#C8DBF0',      // Very light blue
					'blue-100': '#EDF2FA',      // Extremely light blue
					'blue-50': '#F6F9FD',       // Almost white blue
					// Status Colors
					'status-blue': '#6C87BC',    // Status blue
					'status-blue-dark': '#3C5382', // Darker status blue
					'status-blue-light': '#E7ECF4', // Light status blue
					
					'status-green': '#6CBC85',   // Status green
					'status-green-dark': '#357449', // Darker status green
					'status-green-light': '#E7F4EB', // Light status green
					
					'status-orange': '#FBE053', // Status orange (amber)
					'status-orange-dark': '#B97705', // Darker status orange
					'status-orange-light': '#FEF5E3', // Light status orange
					
					'status-red': '#F17173',     // Status red
					'status-red-dark': '#B71215', // Darker status red
					'status-red-light': '#FDE8E9', // Light status red
					
					// Brand Salmon
					'salmon': '#F47A71',        // Primary salmon color
					'salmon-dark': '#923E38',    // Darker salmon
					'salmon-medium': '#EE6D64',  // Medium salmon
					'salmon-light': '#FDE2E1',   // Light salmon
				}
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'card': '14px', // Custom card radius from the design
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

