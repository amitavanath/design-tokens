/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          default: 'var(--text-color-default)',
          subtle: 'var(--text-color-subtle)',
          brand: 'var(--text-color-brand)',
          error: 'var(--text-color-error)',
          success: 'var(--text-color-success)',
        },
      },
      fontSize: {
        xs: ['var(--text-font-size-xs)', 'var(--text-line-height-xs)'],
        sm: ['var(--text-font-size-sm)', 'var(--text-line-height-sm)'],
        md: ['var(--text-font-size-md)', 'var(--text-line-height-md)'],
        lg: ['var(--text-font-size-lg)', 'var(--text-line-height-lg)'],
        xl: ['var(--text-font-size-xl)', 'var(--text-line-height-xl)'],
        '2xl': ['var(--text-font-size-2xl)', 'var(--text-line-height-2xl)'],
        '3xl': ['var(--text-font-size-3xl)', 'var(--text-line-height-3xl)'],
      },
      fontWeight: {
        light: 'var(--text-font-weight-light)',
        regular: 'var(--text-font-weight-regular)',
        medium: 'var(--text-font-weight-medium)',
        semibold: 'var(--text-font-weight-semi-bold)',
        bold: 'var(--text-font-weight-bold)',
      },
    },
  },
  plugins: [],
}
