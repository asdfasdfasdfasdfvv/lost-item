import type { FormElements } from 'constants/search/schema'
import type { ChangeEvent } from 'react'
import type { FormFields } from 'types/form'

interface SearchFormOptionsProps {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void
  getFormFields: () => FormFields<FormElements>
}
export default function SearchFormOptions({
  handleOnChange,
  getFormFields,
}: SearchFormOptionsProps) {
  const { endDate, startDate, lostLocation } = getFormFields()
  return (
    <div className="flex flex-col">
      <div className="mb-10pxr flex items-center justify-start">
        <div className="mr-5pxr text-title">분실장소:</div>
        <div className="flex items-center justify-start">
          {lostLocation.component?.({
            ...lostLocation,
            handleOnChange,
            style: { wrapper: 'w-120pxr rounded border', input: 'p-3pxr' },
          })}
        </div>
      </div>

      <div className="flex items-center justify-start">
        <div className="mr-5pxr text-title">조회기간:</div>
        <div className="flex items-center justify-start">
          {startDate.component?.({
            ...endDate,
            handleOnChange,
            style: { wrapper: 'w-120pxr rounded border', input: 'p-3pxr' },
          })}
          ~
          {endDate.component?.({
            ...endDate,
            handleOnChange,
            style: { wrapper: 'w-120pxr rounded border', input: 'p-3pxr' },
          })}
        </div>
      </div>
    </div>
  )
}
