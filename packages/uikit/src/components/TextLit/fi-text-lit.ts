/**
 * fi-text Web Component implemented with Lit
 *
 * This mirrors the behavior of the existing `FIText` web component
 * in `src/components/Text/fi-text.ts`, but is built using Lit.
 *
 * The component:
 * - Reuses the vanilla-extract Text recipe (`Text.css.ts`)
 * - Does NOT use shadow DOM so global CSS still applies
 * - Supports the same public attributes: size, weight, color,
 *   decoration, overflow, gutter-bottom, and as
 *
 * Usage:
 *   <fi-text-lit size="lg" weight="bold">Hello</fi-text-lit>
 */

import { LitElement, html } from 'lit'
import { unsafeStatic } from 'lit/static-html.js'

import { root as textRoot, type TextVariants } from '../Text/Text.css'

// Helper type aliases based on the existing Text recipe
// These keep the Lit component in sync with design tokens.
export type FiTextLitSize = TextVariants['size']
export type FiTextLitWeight = TextVariants['weight']
export type FiTextLitColor = TextVariants['color']
export type FiTextLitDecoration = TextVariants['decoration']
export type FiTextLitOverflow = TextVariants['overflow']

export class FITextLit extends LitElement {
  static properties = {
    size: { type: String, reflect: true },
    weight: { type: String, reflect: true },
    color: { type: String, reflect: true },
    decoration: { type: String, reflect: true },
    overflow: { type: String, reflect: true },
    gutterBottom: { type: Boolean, attribute: 'gutter-bottom', reflect: true },
    as: { type: String, reflect: true },
  } as const

  // Reuse the same variant-type names so behavior stays in sync.
  size: FiTextLitSize = 'md'
  weight: FiTextLitWeight = 'regular'
  color: FiTextLitColor = 'default'
  decoration?: FiTextLitDecoration
  overflow?: FiTextLitOverflow
  gutterBottom = false
  as: keyof HTMLElementTagNameMap | string = 'span'

  // Disable shadow DOM so vanilla-extract global CSS applies inside.
  protected createRenderRoot(): HTMLElement {
    return this as HTMLElement
  }

  protected render() {
    const tag = unsafeStatic(this.as || 'span')

    // Only pass gutterBottom when true – matches Text.css.ts recipe
    const recipeProps: Partial<TextVariants> & { gutterBottom?: true } = {
      size: this.size,
      weight: this.weight,
      color: this.color,
    }

    if (this.decoration) recipeProps.decoration = this.decoration
    if (this.overflow) recipeProps.overflow = this.overflow
    if (this.gutterBottom) recipeProps.gutterBottom = true

    const classNameFromRecipe = textRoot(recipeProps as TextVariants)

    // If the host has classes, mirror them onto the inner element
    const hostClass = this.className
    const className = hostClass ? `${classNameFromRecipe} ${hostClass}` : classNameFromRecipe

    return html`<${tag} class=${className}><slot></slot></${tag}>`
  }
}

/**
 * Helper to define the Lit-based custom element under a custom tag name.
 * Safe to call multiple times.
 */
export function defineFiTextLit(tagName = 'fi-text-lit') {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, FITextLit)
  }
}

export default FITextLit
