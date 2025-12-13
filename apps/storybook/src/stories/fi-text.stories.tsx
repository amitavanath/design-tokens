import { Meta, StoryObj } from '@storybook/react'
import { useRef, useEffect } from 'react'

interface FiTextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold'
  color?: 'default' | 'subtle' | 'brand' | 'success' | 'error'
  decoration?: 'link' | 'tooltip'
  overflow?: 'ellipsis' | 'clip'
  gutterBottom?: boolean
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  text?: string
}

const FiTextComponent = ({
  size = 'md',
  weight = 'regular',
  color = 'default',
  decoration,
  overflow,
  gutterBottom = false,
  as = 'span',
  text = 'Hello from fi-text (web component)',
}: FiTextProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    
    // Clear previous content
    ref.current.innerHTML = ''
    
    const el = document.createElement('fi-text')
    el.setAttribute('size', size)
    el.setAttribute('weight', weight)
    el.setAttribute('color', color)
    if (decoration) el.setAttribute('decoration', decoration)
    if (overflow) el.setAttribute('overflow', overflow)
    if (gutterBottom) el.setAttribute('gutter-bottom', '')
    el.setAttribute('as', as)
    el.textContent = text
    ref.current.appendChild(el)
  }, [size, weight, color, decoration, overflow, gutterBottom, as, text])

  return <div ref={ref} />
}

const meta: Meta<FiTextProps> = {
  title: 'WebComponents/fi-text',
  component: FiTextComponent,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Font size of the text',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semi-bold', 'bold'],
      description: 'Font weight of the text',
    },
    color: {
      control: 'select',
      options: ['default', 'subtle', 'brand', 'success', 'error'],
      description: 'Color of the text',
    },
    decoration: {
      control: 'select',
      options: [undefined, 'link', 'tooltip'],
      description: 'Text decoration style',
    },
    overflow: {
      control: 'select',
      options: [undefined, 'ellipsis', 'clip'],
      description: 'Text overflow behavior',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'Add bottom margin',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML tag to render',
    },
    text: {
      control: 'text',
      description: 'Text content',
    },
  },
}

export default meta

type Story = StoryObj<FiTextProps>

export const Default: Story = {
  args: {
    size: 'md',
    weight: 'regular',
    color: 'default',
    text: 'Hello from fi-text (web component)',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    weight: 'regular',
    color: 'default',
    text: 'Large text example',
  },
}

export const BoldBrand: Story = {
  args: {
    size: 'md',
    weight: 'bold',
    color: 'brand',
    text: 'Bold brand colored text',
  },
}

export const LinkStyle: Story = {
  args: {
    size: 'md',
    weight: 'regular',
    color: 'brand',
    decoration: 'link',
    text: 'Clickable link text',
  },
}

export const WithEllipsis: Story = {
  args: {
    size: 'md',
    weight: 'regular',
    color: 'default',
    overflow: 'ellipsis',
    text: 'This is a very long text that will be truncated with an ellipsis when it overflows',
  },
}

export const Heading: Story = {
  args: {
    size: '3xl',
    weight: 'bold',
    color: 'default',
    as: 'h1',
    text: 'Heading Example',
  },
}

export const WithGutter: Story = {
  args: {
    size: 'md',
    weight: 'regular',
    color: 'default',
    gutterBottom: true,
    text: 'Text with bottom margin',
  },
}

export const ErrorMessage: Story = {
  args: {
    size: 'sm',
    weight: 'medium',
    color: 'error',
    text: 'Error: Something went wrong',
  },
}

export const SuccessMessage: Story = {
  args: {
    size: 'sm',
    weight: 'medium',
    color: 'success',
    text: 'Success: Operation completed',
  },
}
