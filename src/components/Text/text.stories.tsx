import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./index"

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
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Text decoration="link">Link Decoration (hover me)</Text>
      <Text decoration="tooltip">Tooltip Decoration</Text>
    </div>
  ),
}

export const Overflow: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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