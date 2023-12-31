import type { Meta, StoryObj } from '@storybook/react'
import Button from 'components/common/Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Default Button',
    handler: () => {
      alert('click')
    },
  },
}

export const ImageButton: Story = {
  args: {
    icon: {
      color: '#e8e8e8',
      iconName: 'FaSearch',
      size: 10,
      luminance: 40,
    },
  },
}
