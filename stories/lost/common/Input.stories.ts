import type { Meta, StoryObj } from '@storybook/react'
import Input from 'components/common/Input'

const meta = {
  title: 'Common/input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    invalidMessage: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'input',
    type: 'text',
    disabled: false,
  },
}
