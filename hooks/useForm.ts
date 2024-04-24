import type { FormEvent, MutableRefObject } from 'react'
import { createRef, useRef, useState } from 'react'
import type {
  FormChangeEvent,
  FormFieldRender,
  FormKeys,
  FormRefs,
  FormSchema,
  FormState,
  FormValidateFields,
  SubmitFormData
} from 'types/form'

type UseInputSchemaReturn<T extends keyof FormKeys> = {
  form: FormState<T>
  formStateRefs: MutableRefObject<Partial<{ [K in T]: FormValidateFields }>>
  isFormValid: boolean
  handleOnChange: (formChangeEvent: FormChangeEvent) => void
  handleOnSubmit: (
    submit: (
      e: FormEvent<HTMLFormElement>,
      formData: SubmitFormData<T>,
      formStatus: { isFormValid: boolean; error?: string | null }
    ) => Promise<void>
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>

  getFormFields: () => {
    renderFields: FormFieldRender<T>
  }
  setFormFields: (fieldName: T, value: any) => void
}

const generateFormFields = <T extends keyof FormKeys>(
  formSchema: FormSchema<T>,
  event: {
    [x: string]: any
    handleOnChange?: ({ event, inputData }: FormChangeEvent) => void
  },
  controller: {
    setFormFields?: (fieldName: T, value: any) => void
  }
): { renderFields: FormFieldRender<T> } => {
  const renderFields = {} as FormFieldRender<T>
  const keys = Object.keys(formSchema) as T[]

  keys.forEach((key) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { controlled, component, validate, ...props } = formSchema[key]
    if (component) {
      renderFields[key] =
        component({
          args: { ...props, ...event },
          controller
        }) || null
    }
  })
  return { renderFields }
}
const initializeFormRefs = <T extends keyof FormKeys>(
  formState: FormSchema<T>,
  formRefs: React.MutableRefObject<FormRefs<T>>
): void => {
  const keys = Object.keys(formState) as T[]

  keys.forEach((input) => {
    if (formState[input]?.controlled && !formRefs.current[input]) {
      // eslint-disable-next-line no-param-reassign
      formRefs.current[input] = createRef()
    }
  })
}

const generateInitFormState = <T extends keyof FormKeys>(
  formState: FormSchema<T>,
  formRefs: React.MutableRefObject<FormRefs<T>>
): FormSchema<T> => {
  return (Object.keys(formState) as T[]).reduce<FormSchema<T>>((acc, input) => {
    return {
      ...acc,
      [input]: {
        ...(formState[input] || {}),
        ref: formState[input]?.controlled ? formRefs.current[input] : null
      }
    }
  }, {} as FormSchema<T>)
}

const checkFormValid = <T extends keyof FormKeys>(
  nextForm: FormState<T>
): boolean => {
  const formValues = Object.values(nextForm) as FormValidateFields[]
  const hasErrors = formValues.some((data) => data && data.error !== null)
  return !hasErrors
}

const getFormData = <T extends keyof FormKeys>(
  form: FormState<T>
): SubmitFormData<T> => {
  const keys = Object.keys(form) as T[]
  const formData = keys.reduce((acc, input: T) => {
    const data = form[input]
    return {
      ...acc,
      [input]: data!.value
    }
  }, {} as SubmitFormData<T>)
  return formData
}

const findFirstErrorMessage = <T extends keyof FormKeys>(
  obj: FormState<T>
): string | null => {
  for (const key of Object.keys(obj) as (keyof FormState<T>)[]) {
    const item = obj[key]
    if (item?.error) {
      return item.error
    }
  }
  return null
}

const useForm = <T extends keyof FormKeys>(
  formSchema: FormSchema<T>,
  options?: FormSchema<T>
): UseInputSchemaReturn<T> => {
  const formRefs = useRef<FormRefs<T>>({})
  const initFormState = { ...formSchema, ...options }
  initializeFormRefs(initFormState, formRefs)
  const preprocessedFormState = generateInitFormState(initFormState, formRefs)
  const keys = Object.keys(preprocessedFormState) as T[]
  const initForm = keys.reduce<FormState<T>>((acc, input: T) => {
    const { value, validate } = formSchema[input]
    return {
      ...acc,
      [input]: {
        value,
        error: validate(value)
      }
    }
  }, {})

  const [form, setForm] = useState<FormState<T>>(initForm)
  const formStateRefs = useRef<FormState<T>>(initForm)
  const isFormValid = useRef<boolean>(false)

  const handleOnChange = ({ event, inputData }: FormChangeEvent) => {
    const { name, value } = event
      ? event.target
      : inputData ?? { name: '', value: '' }

    if (!name) {
      return
    }
    const errorMessage = formSchema[name as T]?.validate(value, form)

    const changedForm = {
      ...form,
      [name]: { value, error: errorMessage }
    } as FormState<T>
    setForm(changedForm)

    formStateRefs.current = changedForm
    isFormValid.current = checkFormValid(changedForm)
  }

  const getFormFields = () => {
    const event = {
      handleOnChange
    }
    const controller = {
      setFormFields
    }
    return generateFormFields(preprocessedFormState, event, controller)
  }
  const setFormFields = (fieldName: keyof FormState<T>, value: any) => {
    const errorMessage = formSchema[fieldName as T]?.validate(value, form)
    const updatedForm = {
      ...form,
      [fieldName]: { value, error: errorMessage }
    } as FormState<T>

    setForm(updatedForm)

    if (!fieldName) {
      return
    }

    formStateRefs.current = updatedForm

    isFormValid.current = checkFormValid(updatedForm)
  }

  const handleOnSubmit =
    (onSubmit: {
      (
        e: FormEvent<HTMLFormElement>,
        formData: SubmitFormData<T>,
        formStatus: { isFormValid: boolean; error?: string | null }
      ): Promise<void>
    }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      formSubmit.preventDefault()
      const formStatus = {
        isFormValid: isFormValid.current,
        error: isFormValid.current
          ? null
          : findFirstErrorMessage(formStateRefs.current)
      }

      onSubmit(formSubmit, getFormData(form), formStatus)
    }

  return {
    form,
    formStateRefs,
    handleOnChange,
    isFormValid: isFormValid.current,
    handleOnSubmit,
    getFormFields,
    setFormFields
  }
}

export { useForm }
