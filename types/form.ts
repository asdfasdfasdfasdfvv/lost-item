import type { ChangeEvent, FormEvent, RefObject } from 'react'

export const INPUT_TYPE = {
  text: 'text',
  password: 'password',
  date: 'date'
} as const

export type InputType = keyof typeof INPUT_TYPE
export type FormError = string | null | undefined
export type FormKeys = string | number | symbol | any
export type FormValidateFields = {
  value: string
  error: FormError
}

export type FormState<T extends keyof FormKeys> = Partial<{
  [K in T]: FormValidateFields
}>
type ComponentProps<T> = {
  args: any // args는 여러 추가적인 인자를 포함할 수 있습니다.
  controller: {
    setFormFields?: (fieldName: T, value: any) => void // 폼 필드 값을 설정하는 함수
  }
}
export type FormFieldValue<T extends keyof FormKeys> = {
  value: string | number
  error?: FormError
  controlled?: boolean
  ref?: RefObject<HTMLInputElement>
  name: T
  id: string
  type: InputType
  placeholder?: string
  label?: string
  key?: string
  validatePlaceholder?: string[]
  validate: (
    value: string | number,
    formState?: FormState<T> | undefined
  ) => FormError
  onChange?: () => void
  component?: (props: ComponentProps<T>) => JSX.Element
}
export type FormFieldRender<T extends keyof FormKeys> = {
  [K in T]: JSX.Element | null
}
export type FormSchema<T extends keyof FormKeys> = {
  [K in T]: FormFieldValue<T>
}

export type FormFields<T extends keyof FormKeys> = {
  [K in T]: FormFieldValue<T>
}
export type OmittedFormFieldValue<T extends keyof FormKeys> = Omit<
  FormFieldValue<T>,
  'validate' | 'controlled' | 'component'
>

export type ResponseError = {
  details: string
}

export type FormRefs<T extends keyof FormKeys> = Partial<{
  [K in T]: React.RefObject<any>
}>

export type FormSubmit<T extends keyof FormKeys> = {
  e: FormEvent<HTMLFormElement>
  formData: FormState<T>
}

export type SubmitFormData<T extends keyof FormKeys> = {
  [K in T]: any
}

export type InputData<T extends keyof FormKeys> = {
  name: T
  value: string | Date | number
}

export type FormChangeEvent = {
  event?: ChangeEvent<HTMLInputElement>
  inputData?: { name: string; value: string }
}
