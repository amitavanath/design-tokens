/**
 * fi-text Web Component
 * - Uses the Vanilla Extract `Text` recipe from the main `src` package
 * - Does NOT use shadow DOM so the compiled vanilla-extract CSS (global) applies
 * - Reflects a small set of attributes to the recipe variants so you can use
 *   the component in plain HTML while still using your design tokens
 *
 * Usage:
 * <fi-text size="lg" weight="bold">Hello</fi-text>
 *
 * To register the element in the browser:
 * import { defineFiText } from '@mono/uikit/fi-text' // or relative path
 * defineFiText()
 */

import { root as textRoot, type TextVariants } from '../../src/components/Text/Text.css'

type AttrMap = Partial<Pick<TextVariants, 'size' | 'weight' | 'color' | 'decoration' | 'overflow'>> & {
  gutterBottom?: boolean
}

const ATTRS = [
  'size',
  'weight',
  'color',
  'decoration',
  'overflow',
  'gutter-bottom',
  'as',
]

function attrToProps(el: Element): AttrMap {
  const size = (el.getAttribute('size') || undefined) as any
  const weight = (el.getAttribute('weight') || undefined) as any
  const color = (el.getAttribute('color') || undefined) as any
  const decoration = (el.getAttribute('decoration') || undefined) as any
  const overflow = (el.getAttribute('overflow') || undefined) as any
  const gutterBottom = el.hasAttribute('gutter-bottom')

  return { size, weight, color, decoration, overflow, gutterBottom }
}

function mapToRecipeProps(map: AttrMap) {
  const props: any = {}
  if (map.size) props.size = map.size
  if (map.weight) props.weight = map.weight
  if (map.color) props.color = map.color
  if (map.decoration) props.decoration = map.decoration
  if (map.overflow) props.overflow = map.overflow
  if (map.gutterBottom) props.gutterBottom = true
  return props
}

export class FIText extends HTMLElement {
  static get observedAttributes() {
    return ATTRS
  }

  private _el!: HTMLElement

  constructor() {
    super()
    // No shadow DOM so vanilla-extract global CSS can style the rendered element
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    // Re-render classes when any observed attribute changes
    this.updateClasses()
  }

  private render() {
    // Create the inner element (respect `as` attribute)
    const tag = (this.getAttribute('as') || 'span') as keyof HTMLElementTagNameMap
    const el = document.createElement(tag)

    // Move child nodes into the element (preserve nested content)
    while (this.firstChild) {
      el.appendChild(this.firstChild)
    }

    this._el = el
    this.appendChild(this._el)

    this.updateClasses()
  }

  private updateClasses() {
    if (!this._el) return
    const mapped = attrToProps(this)
    const recipeProps = mapToRecipeProps(mapped)

    // textRoot returns a string class name created by vanilla-extract recipe
    const className = textRoot(recipeProps as any)

    // Preserve any existing classes on the host's `class` attribute by appending
    const hostClass = this.getAttribute('class')
    this._el.className = hostClass ? `${className} ${hostClass}` : className
  }
}

/**
 * Helper to define the custom element. Safe to call multiple times.
 */
export function defineFiText(tagName = 'fi-text') {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, FIText)
  }
}

export default FIText
