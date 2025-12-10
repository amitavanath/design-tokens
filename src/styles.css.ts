import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  fontFamily: {
    inter: 'var(--text-font-family-inter)',
  },
  fontSize: {
    xs: 'var(--text-font-size-xs)',
    sm: 'var(--text-font-size-sm)',
    md: 'var(--text-font-size-md)',
    lg: 'var(--text-font-size-lg)',
    xl: 'var(--text-font-size-xl)',
    '2xl': 'var(--text-font-size-2xl)',
    '3xl': 'var(--text-font-size-3xl)',
  },
  lineHeight: {
    xs: 'var(--text-line-height-xs)',
    sm: 'var(--text-line-height-sm)',
    md: 'var(--text-line-height-md)',
    lg: 'var(--text-line-height-lg)',
    xl: 'var(--text-line-height-xl)',
    '2xl': 'var(--text-line-height-2xl)',
    '3xl': 'var(--text-line-height-3xl)',
  },
  fontWeight: {
    light: 'var(--text-font-weight-light)',
    regular: 'var(--text-font-weight-regular)',
    medium: 'var(--text-font-weight-medium)',
    'semi-bold': 'var(--text-font-weight-semi-bold)',
    bold: 'var(--text-font-weight-bold)',
  },
  color: {
    default: 'var(--text-color-default)',
    subtle: 'var(--text-color-subtle)',
    brand: 'var(--text-color-brand)',
    success: 'var(--text-color-success)',
    error: 'var(--text-color-error)',
  },
})
