import { useState } from 'react'
import React from 'react'
import type { FormError } from 'types/form'
import type { InputStyle } from 'types/style/common'
import tw from 'utils/twMergeObjects'

import type { InputProps } from '../ui/input'
import { RadixInput } from '../ui/input'

type CommonInputProps = InputProps & {
  style?: InputStyle
  label?: string
  validatePlaceholder?: string[]
  inputRef?: React.RefObject<HTMLInputElement>
  invalidMessage?: FormError
}

const twInputStyles = {
  wrapper: 'w-full flex flex-col',
  input: '',
  label: 'font-normal text-base text-white/[0.87] mb-8pxr',
  invalidMessage: 'text-red-500 text-sm h-15pxr'
}

const Input = ({
  value = '',
  style,
  name,
  inputRef,
  placeholder,
  label,
  invalidMessage,
  validatePlaceholder,
  type = 'text',
  ...props
}: CommonInputProps) => {
  const st = tw<InputStyle>(twInputStyles, style)

  const [isFocused, setIsFocused] = useState(false)

  const onFocus = () => {
    setIsFocused(true)
  }
  const onBlur = () => {
    setIsFocused(false)
  }
  return (
    <div className={st.wrapper}>
      {label && (
        <label className={st.label} htmlFor={name}>
          {label}
        </label>
      )}
      <RadixInput
        ref={inputRef}
        className={st.input}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        {...props}
      />

      {isFocused && validatePlaceholder && (
        <div className="mt-3pxr">
          {validatePlaceholder?.map((item, index) => (
            <div className="text-sm text-gray-900" key={index}>
              {item}
            </div>
          ))}
        </div>
      )}

      {invalidMessage && (
        <span className={st.invalidMessage}>{invalidMessage}</span>
      )}
    </div>
  )
}

export default Input
