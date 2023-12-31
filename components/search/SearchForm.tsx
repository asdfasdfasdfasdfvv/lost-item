import Button from 'components/common/Button'
import Input from 'components/common/Input'
import { SearchSchema } from 'constants/search/schema'
import { useForm } from 'hooks/useForm'
import type { InputStyle } from 'types/style/common'

export default function SearchInput() {
  const { getFormFields, handleOnChange } = useForm(SearchSchema)
  const { searchText } = getFormFields()

  const { inputWrapper, searchInput } = {
    inputWrapper: 'flex py-10pxr h-50pxr border rounded-lg px-5pxr box-border',
    searchInput: {
      input: 'bg-transparent px-4 text-white/[0.87]',
    } as InputStyle,
  }

  return (
    <div className="w-full items-center justify-center bg-slate-500">
      <form className={inputWrapper}>
        <Input
          inputRef={searchText.ref}
          value={searchText.value}
          label={searchText.label}
          placeholder={searchText.placeholder}
          name={searchText.name}
          type={searchText.type}
          style={searchInput}
          handleInputChange={handleOnChange}
        />
        <Button
          icon={{ size: 1.5, iconName: 'FaSearch', color: '#e7d7d7' }}
          style={{ button: 'flex bg-gray-500' }}
        />
        <div className="w-150pxr grow">검색 조건</div>
      </form>
    </div>
  )
}
