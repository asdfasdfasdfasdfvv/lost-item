import Input from 'components/common/Input'
import type { ChangeEvent } from 'react'
import { SearchFormDateStyles } from 'styles/lost/search'
import type { FormSchema } from 'types/form'

import { DatePicker } from '@/components/common/DatePicker'

export type FormElements = 'subject' | 'startDate' | 'endDate' | 'lostLocation'

export const SearchSchema: FormSchema<FormElements> = {
  subject: {
    key: 'searchForm_searchText',
    value: '',
    type: 'text',
    controlled: true,
    id: 'subject',
    name: 'subject',
    label: '검색',
    placeholder: '검색어 입력',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args
      const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleOnChange({ event: e })
      }
      return <Input key={key} inputRef={ref} onChange={onChange} {...props} />
    },
    validate: () => {
      return null
    }
  },
  lostLocation: {
    key: 'searchForm_lostLocation',
    value: '',
    type: 'text',
    controlled: true,
    name: 'lostLocation',
    id: 'lostLocation',
    label: '분실 장소',
    placeholder: '분실 장소',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args
      const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleOnChange({ event: e })
      }
      return (
        <Input
          style={SearchFormDateStyles}
          key={key}
          inputRef={ref}
          onChange={onChange}
          {...props}
        />
      )
    },
    validate: () => {
      return null
    }
  },
  startDate: {
    key: 'searchFrom_startDate',
    value: '',
    type: 'date',
    id: 'startDate',
    controlled: true,
    name: 'startDate',
    label: '',
    component: (args) => {
      const { handleOnChange, key, name, ...props } = args
      return (
        <DatePicker
          name={name}
          onSelect={handleOnChange}
          title="시작일"
          key={key}
          {...props}
        />
      )
    },
    validate: () => {
      return null
    }
  },
  endDate: {
    key: 'searchFrom_endDate',
    value: '',
    type: 'date',
    controlled: true,
    id: 'endDate',
    name: 'endDate',
    label: '',
    component: (args) => {
      const { handleOnChange, key, name, ...props } = args
      return (
        <DatePicker
          name={name}
          onSelect={handleOnChange}
          title="종료일"
          key={key}
          {...props}
        />
      )
    },
    validate: () => {
      return null
    }
  }
}
