import type { Meta, StoryObj } from '@storybook/react'
import SearchForm from 'components/search/SearchForm'

const meta = {
  title: 'Search/Form',
  component: SearchForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
