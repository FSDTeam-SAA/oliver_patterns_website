import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class', '.dark'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(180deg, #355AC7 0%, #1271F2 100%)',
        'lightblue': 'linear-gradient(90.93deg, #CCE5FF 3.19%, #D7E8FB 96.81%)',

      },
      borderColor: {
        DEFAULT: 'var(--foreground)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    },
  },
  plugins: [animate],
}

export default config
