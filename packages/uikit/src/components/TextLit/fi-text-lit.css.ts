import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { vars } from '../../styles.css'

export const root = recipe({
  base: {
    fontFamily: vars.fontFamily.inter,
    margin: 0,
  },
  variants: {
    size: {
      xs: {
        fontSize: vars.fontSize.xs,
        lineHeight: vars.lineHeight.xs,
      },
      sm: {
        fontSize: vars.fontSize.sm,
        lineHeight: vars.lineHeight.sm,
      },
      md: {
        fontSize: vars.fontSize.md,
        lineHeight: vars.lineHeight.md,
      },
      lg: {
        fontSize: vars.fontSize.lg,
        lineHeight: vars.lineHeight.lg,
      },
      xl: {
        fontSize: vars.fontSize.xl,
        lineHeight: vars.lineHeight.xl,
      },
      '2xl': {
        fontSize: vars.fontSize['2xl'],
        lineHeight: vars.lineHeight['2xl'],
      },
      '3xl': {
        fontSize: vars.fontSize['3xl'],
        lineHeight: vars.lineHeight['3xl'],
      },
    },
    weight: {
      light: {
        fontWeight: vars.fontWeight.light,
      },
      regular: {
        fontWeight: vars.fontWeight.regular,
      },
      medium: {
        fontWeight: vars.fontWeight.medium,
      },
      'semi-bold': {
        fontWeight: vars.fontWeight['semi-bold'],
      },
      bold: {
        fontWeight: vars.fontWeight.bold,
      },
    },
    color: {
      default: {
        color: vars.color.default,
      },
      subtle: {
        color: vars.color.subtle,
      },
      brand: {
        color: vars.color.brand,
      },
      success: {
        color: vars.color.success,
      },
      error: {
        color: vars.color.error,
      },
    },
    decoration: {
      link: {
        cursor: 'pointer',
        textDecoration: 'none',
        textUnderlineOffset: '2px',
        selectors: {
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
      tooltip: {
        cursor: 'pointer',
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        textUnderlineOffset: '2px',
      },
    },
    overflow: {
      ellipsis: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      clip: {
        textOverflow: 'clip',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
    },
    gutterBottom: {
      true: {
        marginBottom: '1rem',
        display: 'inline-block',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
})

export type TextVariants = RecipeVariants<typeof root>
