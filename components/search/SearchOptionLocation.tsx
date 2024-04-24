'use client'

import { useQuery } from '@tanstack/react-query'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../common/Select'
import { getLostLocationList } from '../lost-item/api/LostItems'
import type { OptionType } from '../lost-item/types/options'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

type Props = SelectProps & {
  placeholder: string
  inputRef?: React.RefObject<HTMLButtonElement>
  onValueChange: (value: string) => void
}
export const Category = {
  WORKOUT: '운동',
  LEARNING: '학습',
  READING: '독서',
  LIFESTYLEHABITS: '생활습관',
  HOBBY: '취미',
  FINANCE: '금융',
  ALL: '전체'
} as const

export default function SearchOptionLocation({
  onValueChange,
  inputRef,
  placeholder
}: Props) {
  const { data, isLoading } = useQuery<OptionType[]>({
    queryKey: ['SearchOptionLocationList'],
    queryFn: async () => {
      const data = await getLostLocationList()
      return data
    }
  })
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue ref={inputRef} placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {Object.values(Category).map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
