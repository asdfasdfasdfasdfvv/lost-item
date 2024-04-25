'use client'

import { useQuery } from '@tanstack/react-query'
import type { FormElements } from 'constants/search/schema'
import { useEffect } from 'react'
import type { FormProps } from 'types/form'

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

// type Props = SelectProps & {
//   placeholder: string
//   inputRef?: React.RefObject<HTMLButtonElement>
//   onValueChange: (value: string) => void
//   formContller: FormContrlloer<T>
// }
export const Category = {
  WORKOUT: '운동',
  LEARNING: '학습',
  READING: '독서',
  LIFESTYLEHABITS: '생활습관',
  HOBBY: '취미',
  FINANCE: '금융',
  ALL: '전체'
} as const

const SearchOptionLocation = ({
  args,
  controller
}: FormProps<FormElements>) => {
  const { handleOnChange, ref, name, placeholder, value } = args
  const { data, status } = useQuery<OptionType[]>({
    queryKey: ['SearchOptionLocationList'],
    queryFn: async () => {
      const data = await getLostLocationList()
      return data
    }
  })
  useEffect(() => {
    if (status === 'success' && data && data?.length > 0) {
      controller?.setFieldValue(name, data[0].value)
    }
  }, [data])
  const onChange = (selectValue: string) => {
    handleOnChange({ inputData: { name, value: selectValue } })
  }
  console.log(value, data)
  return (
    <div className="relative my-2 flex w-full px-3pxr">
      <Select onValueChange={onChange} defaultValue={value} value={value}>
        <SelectTrigger>
          <SelectValue ref={ref} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {data &&
            Object.values(data).map(({ name, value }) => (
              <SelectItem key={value} value={value}>
                {name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SearchOptionLocation
