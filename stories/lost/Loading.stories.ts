import type { Meta, StoryObj } from '@storybook/react'

import Loading from '@/app/Loading'

const meta = {
  title: 'Common/Loading Skeleton',
  component: Loading,
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
