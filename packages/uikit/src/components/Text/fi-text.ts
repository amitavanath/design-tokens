/**
 * fi-text Web Component (uikit/src)
 * Local variant that uses package-local recipe and helpers
 */

import { root as textRoot } from './Text.css'

type AttrMap = {
  size?: string
  weight?: string
  color?: string
  decoration?: string
  overflow?: string
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
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.updateClasses()
  }

  private render() {
    const tag = (this.getAttribute('as') || 'span') as keyof HTMLElementTagNameMap
    const el = document.createElement(tag)

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
    const className = textRoot(recipeProps as any)
    const hostClass = this.getAttribute('class')
    this._el.className = hostClass ? `${className} ${hostClass}` : className
  }
}

export function defineFiText(tagName = 'fi-text') {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, FIText)
  }
}

export default FIText
