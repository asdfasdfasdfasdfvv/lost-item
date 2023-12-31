import type { FormSchema } from 'types/form'

export type FormElements = 'searchText'
export const SearchSchema: FormSchema<FormElements> = {
  searchText: {
    key: 'searchForm_1',
    value: '',
    type: 'text',
    isControlled: true,
    name: 'searchText',
    label: '',
    placeholder: '검색어 입력',
    validate: (value: string) => {
      if (!value) {
        return '입력이 필요합니다.'
      }
      return null
    },
  },
}
