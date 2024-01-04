import type { Meta, StoryObj } from '@storybook/react'
import LostItemDetail from 'components/lost-item/LostItemDetail'

const meta = {
  title: 'LostItem/Detail',
  component: LostItemDetail,
  tags: ['autodocs']
} satisfies Meta<typeof LostItemDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { lostItemId: 'test' } }
