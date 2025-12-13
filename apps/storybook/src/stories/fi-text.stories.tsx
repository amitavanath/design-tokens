import { Meta } from '@storybook/react'
import { useRef, useEffect } from 'react'

const meta: Meta = {
  title: 'WebComponents/fi-text',
}

export default meta

export const Default = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = document.createElement('fi-text')
    el.setAttribute('size', 'lg')
    el.textContent = 'Hello from fi-text (web component)'
    ref.current.appendChild(el)
  }, [])

  return <div ref={ref} />
}
