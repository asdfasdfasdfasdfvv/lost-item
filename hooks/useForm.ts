/**
 * useForm - A custom React hook for handling forms with validation.
 *
 * Purpose:
 * This hook simplifies form handling in React applications by managing form state,
 * validations, and submissions. It provides an easy way to create controlled form elements
 * with validation logic and to gather form data for submission.
 *
 * Usage:
 * const { form, formStateRefs, isFormValid, handleOnChange, handleOnSubmit, getFormFields } = useForm(formSchema);
 *
 * Parameters:
 * - formSchema: FormSchema<T> - An object defining the structure of the form, including initial values, validators, and other field properties.
 * - options (optional): FormSchema<T> - Additional options to customize the form's behavior and initial state.
 *
 * Returns:
 * - form: FormState<T> - The current state of the form, including values and errors for each field.
 * - formStateRefs: MutableRefObject<Partial<{ [K in T]: FormValidateFields }>> - References to the form state, allowing for external manipulation.
 * - isFormValid: boolean - A flag indicating whether the form is currently valid (no errors) or not.
 * - handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void - A function to be called whenever an input value changes, updating the form state and validating the input.
 * - handleOnSubmit: (submit: (e: FormEvent<HTMLFormElement>, formData: SubmitFormData<T>) => Promise<void>) => (event: FormEvent<HTMLFormElement>) => Promise<void> - A function to handle form submission, which should be passed the actual submission logic.
 * - getFormFields: () => FormFields<T> - A function to retrieve the form fields with their current state and configuration.
 *
 * Example:
 * ```jsx
 * const formSchema = {
 *   username: {
 *     value: '',
 *     validate: (value) => (!value ? 'Username is required' : null),
 *     // ... other field properties
 *   },
 *   // ... other fields
 * };
 *
 * const MyComponent = () => {
 *   const { form, handleOnChange, handleOnSubmit } = useForm(formSchema);
 *
 *   const submitForm = async (e, formData) => {
 *     // handle form submission
 *   };
 *
 *   return (
 *     <form onSubmit={handleOnSubmit(submitForm)}>
 *       <input name="username" value={form.username.value} onChange={handleOnChange} />
 *       {form.username.error && <span>{form.username.error}</span>}
 *       // ... other form inputs
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * };
 * ```
 *
 * Note: Replace T with the appropriate type or interface representing your form's field names.
 */

import type { ChangeEvent, FormEvent, MutableRefObject } from 'react'
import { createRef, useRef, useState } from 'react'
import type {
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
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnSubmit: (
    submit: (
      e: FormEvent<HTMLFormElement>,
      formData: SubmitFormData<T>
    ) => Promise<void>
  ) => (event: FormEvent<HTMLFormElement>) => Promise<void>

  getFormFields: () => {
    renderFields: FormFieldRender<T>
  }
}

const generateFormFields = <T extends keyof FormKeys>(
  formSchema: FormSchema<T>,
  event: {
    [x: string]: any
    handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void
  }
): { renderFields: FormFieldRender<T> } => {
  const renderFields = {} as FormFieldRender<T>
  const keys = Object.keys(formSchema) as T[]

  keys.forEach((key) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { controlled, component, validate, ...props } = formSchema[key]

    renderFields[key] =
      formSchema[key].component?.({ ...props, ...event }) || null
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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const errorMessage = formSchema[name as T]?.validate(value, form)
    console.log(name, value)
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
    return generateFormFields(preprocessedFormState, event)
  }
  const handleOnSubmit =
    (onSubmit: {
      (
        e: FormEvent<HTMLFormElement>,
        formData: SubmitFormData<T>
      ): Promise<void>
    }) =>
    async (formSubmit: FormEvent<HTMLFormElement>) => {
      formSubmit.preventDefault()

      if (isFormValid.current) {
        onSubmit(formSubmit, getFormData(form))
      }
      // Todo inValidate form error handle
    }

  return {
    form,
    formStateRefs,
    handleOnChange,
    isFormValid: isFormValid.current,
    handleOnSubmit,
    getFormFields
  }
}

export { useForm }
