import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, type ReactNode } from 'react'

import { defineFiText } from '../../../../packages/uikit/fi-text'

defineFiText()

interface FiTextStoryProps {
  children?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  weight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold'
  color?: 'default' | 'subtle' | 'brand' | 'success' | 'error'
  decoration?: 'link' | 'tooltip'
  overflow?: 'ellipsis' | 'clip'
  gutterBottom?: boolean
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const FiText = ({
  children,
  size = 'md',
  weight = 'regular',
  color = 'default',
  decoration,
  overflow,
  gutterBottom = false,
  as = 'span',
}: FiTextStoryProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.innerHTML = ''

    const el = document.createElement('fi-text')
    el.setAttribute('size', size)
    el.setAttribute('weight', weight)
    el.setAttribute('color', color)
    if (decoration) el.setAttribute('decoration', decoration)
    if (overflow) el.setAttribute('overflow', overflow)
    if (gutterBottom) el.setAttribute('gutter-bottom', '')
    el.setAttribute('as', as)

    if (typeof children === 'string') {
      el.textContent = children
    }

    ref.current.appendChild(el)
  }, [as, children, color, decoration, gutterBottom, overflow, size, weight])

  return <div ref={ref} />
}

const meta = {
  title: 'WebComponents/fi-text',
  component: FiText,
  decorators: [
    (Story) => (
      <div style={{ width: '480px', maxWidth: '90vw' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semi-bold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['default', 'subtle', 'brand', 'success', 'error'],
    },
    decoration: {
      control: 'select',
      options: ['link', 'tooltip'],
    },
    overflow: {
      control: 'select',
      options: ['ellipsis', 'clip'],
    },
    gutterBottom: {
      control: 'boolean',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
} satisfies Meta<typeof FiText>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolor illo odio unde optio delectus iste quidem architecto, rerum nesciunt porro amet tempore enim, tenetur quis ipsam consectetur accusamus maxime!',
  },
  render: (args) => <FiText {...args} />,
}

export const Overflow: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolor illo odio unde optio delectus iste quidem architecto, rerum nesciunt porro amet tempore enim, tenetur quis ipsam consectetur accusamus maxime!',
    overflow: 'ellipsis',
  },
  argTypes: {
    overflow: {
      control: 'select',
      options: ['ellipsis', 'clip'],
    },
  },
  render: (args) => (
    <div style={{ maxWidth: '200px' }}>
      <FiText {...args} />
    </div>
  ),
}

export const Gutter: Story = {
  args: {
    children: 'Text with gutter',
    gutterBottom: true,
  },
  render: (args) => <FiText {...args} />,
}

export const LinkDecoration: Story = {
  ...Basic,
  args: {
    children: 'Link',
    decoration: 'link',
    color: 'brand',
  },
}

export const TooltipDecoration: Story = {
  ...Basic,
  args: {
    children: 'Tooltip',
    decoration: 'tooltip',
    color: 'brand',
  },
}

