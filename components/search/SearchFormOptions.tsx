import type { FormElements } from 'constants/search/schema'
import type { FormFields } from 'types/form'

interface SearchFormOptionsProps {
  getFormFields: () => {
    renderFields: any
    formFields: FormFields<FormElements>
  }
}
export default function SearchFormOptions({
  getFormFields,
}: SearchFormOptionsProps) {
  const {
    renderFields: { endDate, startDate, lostLocation },
  } = getFormFields()
  return (
    <div className="flex flex-col">
      <div className="mb-10pxr flex items-center justify-start">
        <div className="mr-5pxr text-title">분실장소:</div>
        <div className="flex items-center justify-start">{lostLocation}</div>
      </div>

      <div className="flex items-center justify-start">
        <div className="mr-5pxr text-title">조회기간:</div>
        <div className="flex items-center justify-start">
          {startDate}~{endDate}
        </div>
      </div>
    </div>
  )
}
