import Input from 'components/common/Input'
import type { FormSchema } from 'types/form'

export type FormElements =
  | 'searchText'
  | 'startDate'
  | 'endDate'
  | 'lostLocation'
export const SearchSchema: FormSchema<FormElements> = {
  searchText: {
    key: 'searchForm_searchText',
    value: '',
    type: 'text',
    controlled: true,
    name: 'searchText',
    label: '',
    placeholder: '검색어 입력',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args
      return (
        <Input key={key} inputRef={ref} onChange={handleOnChange} {...props} />
      )
    },
    validate: (value) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    }
  },
  lostLocation: {
    key: 'searchForm_lostLocation',
    value: '',
    type: 'text',
    controlled: true,
    name: 'lostLocation',
    label: '',
    placeholder: '분실 장소',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args

      return (
        <Input key={key} inputRef={ref} onChange={handleOnChange} {...props} />
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
    controlled: true,
    name: 'startDate',
    label: '',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args
      return (
        <Input key={key} inputRef={ref} onChange={handleOnChange} {...props} />
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
    name: 'endDate',
    label: '',
    component: (args) => {
      const { handleOnChange, key, ref, ...props } = args
      return (
        <Input key={key} inputRef={ref} onChange={handleOnChange} {...props} />
      )
    },
    validate: () => {
      return null
    }
  }
}
