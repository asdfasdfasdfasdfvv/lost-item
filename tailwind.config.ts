/* eslint-disable import/no-extraneous-dependencies */

import type { Config } from 'tailwindcss'

const pxToRem = (px: number, base = 16) => `${px / base}rem`
const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      borderRadius: {
        'lg-plus': '1.25rem',
      },
      spacing: {
        box: '1.18rem',
        item: '0.56rem',
        ...range(0, 500).reduce((acc: { [key: string]: string }, px) => {
          acc[`${px}pxr`] = pxToRem(px)
          return acc
        }, {}),
      },
      colors: {
        bgGray: '#F8F8F8',
        title: '#260101',
        subtitle: '#999999',
        primary: '#383838',
        icon: '#f2f2f2',
      },
      boxShadow: {
        box: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
