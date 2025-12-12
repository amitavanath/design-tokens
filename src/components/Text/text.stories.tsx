import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./index"
import { sx } from "../../sx"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
    weight: {
      control: "select",
      options: ["light", "regular", "medium", "semi-bold", "bold"],
    },
    color: {
      control: "select",
      options: ["default", "subtle", "brand", "success", "error"],
    },
    decoration: {
      control: "select",
      options: [undefined, "link", "tooltip"],
    },
    overflow: {
      control: "select",
      options: [undefined, "ellipsis", "clip"],
    },
    gutterBottom: {
      control: "boolean",
    },
    as: {
      control: "select",
      options: ["p", "span", "strong", "em", "h1", "h2", "h3"],
    },
    asChild: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    size: "md",
    weight: "regular",
    color: "default",
  },
}

export const AllHeadings: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '300' })}>
      <Text as="h1" size="3xl" weight="bold">
        Heading 1 - 3XL Bold
      </Text>
      <Text as="h2" size="2xl" weight="bold">
        Heading 2 - 2XL Bold
      </Text>
      <Text as="h3" size="xl" weight="bold">
        Heading 3 - XL Bold
      </Text>
    </div>
  ),
}

export const SizeRamp: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '200' })}>
      <Text size="xs" weight="regular">
        Extra Small (xs)
      </Text>
      <Text size="sm" weight="regular">
        Small (sm)
      </Text>
      <Text size="md" weight="regular">
        Medium (md)
      </Text>
      <Text size="lg" weight="regular">
        Large (lg)
      </Text>
      <Text size="xl" weight="regular">
        Extra Large (xl)
      </Text>
      <Text size="2xl" weight="regular">
        2XL (2xl)
      </Text>
      <Text size="3xl" weight="regular">
        3XL (3xl)
      </Text>
    </div>
  ),
}

export const FontWeights: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '100' })}>
      <Text weight="light" size="md">
        Light Weight
      </Text>
      <Text weight="regular" size="md">
        Regular Weight
      </Text>
      <Text weight="medium" size="md">
        Medium Weight
      </Text>
      <Text weight="semi-bold" size="md">
        Semi-Bold Weight
      </Text>
      <Text weight="bold" size="md">
        Bold Weight
      </Text>
    </div>
  ),
}

export const ColorPalette: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '100' })}>
      <Text color="default">Default Color</Text>
      <Text color="subtle">Subtle Color</Text>
      <Text color="brand">Brand Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="error">Error Color</Text>
    </div>
  ),
}

export const Decorations: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '200' })}>
      <Text decoration="link">Link Decoration (hover me)</Text>
      <Text decoration="tooltip">Tooltip Decoration</Text>
    </div>
  ),
}

export const Overflow: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '200' })}>
      <div style={{ width: "12rem" }}>
        <Text overflow="ellipsis">
          This text is very long and will be truncated with an ellipsis when it exceeds the container width
        </Text>
      </div>
      <div style={{ width: "12rem" }}>
        <Text overflow="clip">
          This text is very long and will be clipped when it exceeds the container width
        </Text>
      </div>
    </div>
  ),
}

export const GutterBottom: Story = {
  render: () => (
    <div>
      <Text gutterBottom>Text with bottom margin</Text>
      <Text>Text without bottom margin</Text>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <Text asChild>
      <a href="#" style={{ textDecoration: "underline" }}>
        This is a link rendered with Text styling
      </a>
    </Text>
  ),
}

export const ResponsiveExample: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '300' })}>
      <div>
        <Text size="lg" weight="bold" color="brand" gutterBottom>
          Success State
        </Text>
        <Text color="success">Your changes have been saved successfully</Text>
      </div>
      <div>
        <Text size="lg" weight="bold" color="brand" gutterBottom>
          Error State
        </Text>
        <Text color="error">An error occurred while processing your request</Text>
      </div>
    </div>
  ),
}

export const WithSprinkles: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '400' })}>
      <div className={sx({ padding: '300', backgroundColor: 'transparent' })}>
        <Text 
          size="lg" 
          weight="bold" 
          color="brand" 
          sprinkles={{ marginBottom: '200' }}
        >
          Using Sprinkles with Text
        </Text>
        <Text color="default">
          Text component accepts sprinkles prop for spacing and layout utilities
        </Text>
      </div>

      <div className={sx({ display: 'flex', flexDirection: 'column', gap: '200' })}>
        <Text weight="medium" color="subtle">Sprinkles Examples:</Text>
        <Text sprinkles={{ marginBottom: '100' }}>Margin bottom with scale-100 (4px)</Text>
        <Text sprinkles={{ marginBottom: '200' }}>Margin bottom with scale-200 (8px)</Text>
        <Text sprinkles={{ marginBottom: '300' }}>Margin bottom with scale-300 (12px)</Text>
      </div>
    </div>
  ),
}

export const DesignTokenDemo: Story = {
  render: () => (
    <div className={sx({ display: 'flex', flexDirection: 'column', gap: '400', padding: '300' })}>
      <div>
        <Text 
          as="h2" 
          size="2xl" 
          weight="bold" 
          color="brand"
          sprinkles={{ marginBottom: '200' }}
        >
          Design Tokens in Action
        </Text>
        <Text color="subtle" sprinkles={{ marginBottom: '300' }}>
          All spacing values are connected to your design system scale
        </Text>
      </div>

      <div className={sx({ display: 'flex', flexDirection: 'column', gap: '300' })}>
        {(['100', '200', '300', '400', '500', '600'] as const).map((scale) => (
          <div key={scale} className={sx({ display: 'flex', gap: '200', alignItems: 'center' })}>
            <Text weight="medium" style={{ minWidth: '4rem' }} color="subtle">
              {scale}
            </Text>
            <div 
              className={sx({ 
                flex: '1',
                backgroundColor: 'transparent',
                padding: scale,
              })} 
              style={{ border: '1px solid #e0e0e0' }}
            >
              <Text size="sm">Padding: {scale}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}