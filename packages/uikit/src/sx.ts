import { clsx, type ClassValue } from 'clsx'
import { sprinkles, type Sprinkles } from './sprinkles.css'

/**
 * Combines Vanilla Extract sprinkles with other class values
 */
export function sx(sprinklesProps: Sprinkles, ...classValues: ClassValue[]) {
  return clsx(sprinkles(sprinklesProps), ...classValues)
}

export { sprinkles }
export type { Sprinkles }
