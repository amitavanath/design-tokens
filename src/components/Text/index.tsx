import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

import * as styles from './Text.css'
import type { TextVariants } from './Text.css'
import { sx, type Sprinkles } from '../../sx'

export type TextProps = HTMLAttributes<HTMLSpanElement> &
  TextVariants & {
    /**
     * Whether to render the component as its child element.
     */
    asChild?: boolean

    /**
     * The semantic HTML element to render as.
     * @default 'span'
     */
    as?: 'p' | 'span' | 'strong' | 'em' | 'h1' | 'h2' | 'h3'

    /**
     * Bottom margin for the text.
     */
    gutterBottom?: boolean

    /**
     * Sprinkles atomic utilities for additional spacing, layout, and styling.
     */
    sprinkles?: Sprinkles
  }

export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text(
  { asChild, as, className, size, weight, color, decoration, overflow, gutterBottom, sprinkles: sprinklesProps, ...props },
  forwardedRef
) {
  const Component = asChild ? Slot : (as || 'span')

  const textClass = clsx(
    styles.root({
      size,
      weight,
      color,
      decoration,
      overflow,
      gutterBottom,
    }),
    sprinklesProps ? sx(sprinklesProps) : undefined,
    className
  )

  return (
     <Component ref={forwardedRef as any} className={textClass} {...props} />
  )
})

Text.displayName = 'Text'
export default Text