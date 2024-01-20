'use client'
import Button from 'components/common/Button'
import type { FormElements } from 'constants/search/schema'
import { SearchSchema } from 'constants/search/schema'
import { useForm } from 'hooks/useForm'
import type { FormEvent } from 'react'
import { SearchFormStyle } from 'styles/lost/search'
import type { SubmitFormData } from 'types/form'

import SearchFormOptions from './SearchFormOptions'

const { searchWrapper, inputWrapper, submitButton } = SearchFormStyle

export default function SearchForm() {
  const { getFormFields, handleOnSubmit } = useForm(SearchSchema)
  const {
    renderFields: { searchText }
  } = getFormFields()

  const handleSearchSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: SubmitFormData<FormElements>
  ) => {
    e.preventDefault()

    console.log(formData)
  }
  return (
    <div className={searchWrapper}>
      <form
        className={inputWrapper}
        onSubmit={handleOnSubmit(handleSearchSubmit)}>
        <div className="flex-center">
          {searchText}
          <Button icon={submitButton} buttonType="submit" />
        </div>
        <SearchFormOptions getFormFields={getFormFields} />
      </form>
    </div>
  )
}
