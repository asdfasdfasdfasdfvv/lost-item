import type { IconType } from 'components/common/Button'
import type { InputStyle } from 'types/style/common'

export const SearchFormStyle = {
  searchWrapper: 'w-full items-center justify-center pt-2pxr mb-10pxr',
  inputWrapper: 'flex flex-col py-10pxr rounded-lg px-5pxr box-border',
  searchInput: {
    input: 'bg-transparent px-4 text-title h-48pxr mr-5pxr'
  } as InputStyle,
  submitButton: {
    size: 1.5,
    iconName: 'FaSearch',
    color: '#a8b6bb'
  } as IconType,
  searchOption: {
    wrapper: 'w-150pxr grow text-title flex-center',
    button: 'bg-primary flex border rounded-lg p-5pxr text-white'
  }
}

export const SearchFormDateStyles = {
  wrapper: 'min-w-165pxr',
  input: 'min-w-165pxr'
} as InputStyle
