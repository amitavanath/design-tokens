import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from './styles.css'

// NOTE: TypeScript / @vanilla-extract/sprinkles typing workaround
// The `defineProperties` overloads in the installed @vanilla-extract/sprinkles types
// may not accept the `conditions` property in this workspace/TS version. Casting
// the options object to `any` prevents a compile-time error while keeping the
// runtime behavior intact. Remove this cast once types are upgraded or aligned.
const colorProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1025px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    color: {
      textDefault: vars.color.default,
      textSubtle: vars.color.subtle,
      textBrand: vars.color.brand,
      textSuccess: vars.color.success,
      textError: vars.color.error,
    },
    backgroundColor: {
      transparent: 'transparent',
    },
  },
} as any)

// NOTE: see comment above — casting to `any` to avoid a TS overload mismatch
const layoutProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1025px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      flex: 'flex',
      grid: 'grid',
      none: 'none',
    },
    width: {
      full: '100%',
      half: '50%',
      third: '33.333%',
      quarter: '25%',
    },
    flexDirection: {
      row: 'row',
      column: 'column',
      'row-reverse': 'row-reverse',
      'column-reverse': 'column-reverse',
    },
    justifyContent: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    },
    alignItems: {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
    },
    textAlign: {
      left: 'left',
      center: 'center',
      right: 'right',
      justify: 'justify',
    },
  },
} as any)

// NOTE: see comment above — casting to `any` to avoid a TS overload mismatch
const spacingProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1025px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    padding: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    margin: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    marginTop: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    marginBottom: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    marginLeft: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    marginRight: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
    gap: {
      '0': vars.scale['0'],
      '25': vars.scale['25'],
      '50': vars.scale['50'],
      '100': vars.scale['100'],
      '200': vars.scale['200'],
      '300': vars.scale['300'],
      '400': vars.scale['400'],
      '500': vars.scale['500'],
      '600': vars.scale['600'],
      '700': vars.scale['700'],
      '800': vars.scale['800'],
      '900': vars.scale['900'],
      '1000': vars.scale['1000'],
      '1100': vars.scale['1100'],
      '1200': vars.scale['1200'],
      '1300': vars.scale['1300'],
    },
  },
  shorthands: {
    p: ['padding'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['margin'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
  },
} as any)

// NOTE: see comment above — casting to `any` to avoid a TS overload mismatch
const typographyProperties = defineProperties({
  conditions: {
    mobile: {},
    desktop: { '@media': 'screen and (min-width: 1025px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    fontSize: {
      xs: vars.fontSize.xs,
      sm: vars.fontSize.sm,
      md: vars.fontSize.md,
      lg: vars.fontSize.lg,
      xl: vars.fontSize.xl,
      '2xl': vars.fontSize['2xl'],
      '3xl': vars.fontSize['3xl'],
    },
    fontWeight: {
      light: vars.fontWeight.light,
      regular: vars.fontWeight.regular,
      medium: vars.fontWeight.medium,
      'semi-bold': vars.fontWeight['semi-bold'],
      bold: vars.fontWeight.bold,
    },
    lineHeight: {
      xs: vars.lineHeight.xs,
      sm: vars.lineHeight.sm,
      md: vars.lineHeight.md,
      lg: vars.lineHeight.lg,
      xl: vars.lineHeight.xl,
      '2xl': vars.lineHeight['2xl'],
      '3xl': vars.lineHeight['3xl'],
    },
    fontFamily: {
      inter: vars.fontFamily.inter,
    },
  },
} as any)

export const sprinkles = createSprinkles(colorProperties, layoutProperties, spacingProperties, typographyProperties)

export type Sprinkles = Parameters<typeof sprinkles>[0]
