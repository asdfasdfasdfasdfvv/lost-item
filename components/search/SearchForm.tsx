import Button from 'components/common/Button'
import { SearchSchema } from 'constants/search/schema'
import { useForm } from 'hooks/useForm'
import { SearchFormStyle } from 'styles/lost/search'

import SearchFormOptions from './SearchFormOptions'

const { searchWrapper, inputWrapper, submitButton, searchOption } =
  SearchFormStyle

export default function SearchInput() {
  const { getFormFields, handleOnChange } = useForm(SearchSchema)
  const { searchText } = getFormFields()

  return (
    <div className={searchWrapper}>
      <form className={inputWrapper}>
        <div className="flex-center">
          {searchText.component?.({ ...searchText, handleOnChange })}
          <Button icon={submitButton} />
          <div className={searchOption.wrapper}>
            <Button
              title="검색조건"
              style={{
                button: searchOption.button,
              }}
            />
          </div>
        </div>
        <SearchFormOptions
          handleOnChange={handleOnChange}
          getFormFields={getFormFields}
        />
      </form>
    </div>
  )
}
