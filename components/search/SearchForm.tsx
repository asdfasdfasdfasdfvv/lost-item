import { modalContentState } from 'atom/modalAtom'
import Button from 'components/common/Button'
import type { FormElements } from 'constants/search/schema'
import { SearchSchema } from 'constants/search/schema'
import { useForm } from 'hooks/useForm'
import type { FormEvent } from 'react'
import { useSetRecoilState } from 'recoil'
import { SearchFormStyle } from 'styles/lost/search'
import type { LostItemRequestType } from 'types/api/lost'
import type { SubmitFormData } from 'types/form'

import { AlertDestructive } from '../common/AlertDestructive'
import SearchFormOptions from './SearchFormOptions'

const { searchWrapper, inputWrapper, submitButton } = SearchFormStyle

interface Props {
  updateSearchParams: (params: LostItemRequestType) => void
}

export default function SearchForm({ updateSearchParams }: Props) {
  const { getFormFields, handleOnSubmit } = useForm(SearchSchema)
  const setModal = useSetRecoilState(modalContentState)
  const {
    renderFields: { subject }
  } = getFormFields()

  const handleSearchSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: SubmitFormData<FormElements>,
    { isFormValid, error }: { isFormValid: boolean; error?: string | null }
  ) => {
    e.preventDefault()

    if (!isFormValid) {
      setModal(<AlertDestructive errorMessage={error} />)
      return
    }
    const params: LostItemRequestType = {
      ...formData
    }
    updateSearchParams(params)
  }
  return (
    <div className={searchWrapper}>
      <form
        className={inputWrapper}
        onSubmit={handleOnSubmit(handleSearchSubmit)}>
        <div className="flex items-end">
          {subject}
          <Button icon={submitButton} buttonType="submit" />
        </div>
        <SearchFormOptions getFormFields={getFormFields} />
      </form>
    </div>
  )
}
