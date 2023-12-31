import type { FormEvent, RefObject } from 'react'

export const INPUT_TYPE = {
  TEXT: 'text',
  PASSWORD: 'password',
} as const

export type FormError = string | null | undefined
export type FormKeys = string | number | symbol | any
export type FormValidateFields = {
  value: string
  error: FormError
}

export type FormState<T extends keyof FormKeys> = Partial<{
  [K in T]: FormValidateFields
}>

export type FormFieldValue<T extends keyof FormKeys> = {
  value: string
  error?: FormError
  isControlled?: boolean
  ref?: RefObject<HTMLInputElement>
  name: T
  type: string
  placeholder?: string
  label?: string
  key?: string
  validatePlaceholder?: string[]
  validate: (value: string, formState?: FormState<T> | undefined) => FormError
  onChange?: () => void
}
export type FormSchema<T extends keyof FormKeys> = {
  [K in T]: FormFieldValue<T>
}

export type FormFields<T extends keyof FormKeys> = {
  [K in T]: FormFieldValue<T>
}

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
