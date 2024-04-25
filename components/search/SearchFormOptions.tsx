import type { FormElements } from 'constants/search/schema'
import type { FormFieldRender } from 'types/form'

import { RadixLabel } from '../ui/label'

interface SearchFormOptionsProps {
  getFormFields: () => {
    renderFields: FormFieldRender<FormElements>
  }
}
export default function SearchFormOptions({
  getFormFields
}: SearchFormOptionsProps) {
  const {
    renderFields: { endDate, startDate, location }
  } = getFormFields()
  return (
    <div className="flex flex-col">
      <div className="mb-10pxr flex items-center justify-start">
        <div className="flex w-full items-center justify-start">{location}</div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <RadixLabel htmlFor="startDate">조회 기간</RadixLabel>
        <div className="mt-2 flex w-full items-center justify-start">
          {startDate}~{endDate}
        </div>
      </div>
    </div>
  )
}
