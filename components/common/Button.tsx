import ImageIcon from 'components/common/ImageIcon'
import type { ButtonStyle } from 'types/style/common'
import tw from 'utils/twMergeObjects'

import type { IconKeys } from './DynamicIcon'
import DynamicIcon from './DynamicIcon'

export type IconType = {
  iconName: IconKeys
  size: number
  color?: string
  luminance?: number
}
type ButtonProps = {
  title?: string
  icon?: IconType
  imageIcon?: string
  handler?: (value?: any) => void
  style?: ButtonStyle
  disabled?: boolean
  dataType?: string | number
  buttonType?: 'submit' | 'reset' | 'button' | undefined
}

const twButtonStyles = {
  button: '',
  icon: '',
  imageIcon: '',
  title: ''
}

const Button = ({
  title,
  handler,
  style,
  icon,
  imageIcon,
  disabled = false,
  dataType = '',
  buttonType = 'button'
}: ButtonProps) => {
  const st = tw<ButtonStyle>(twButtonStyles, style)
  return (
    <button
      type={buttonType}
      disabled={disabled}
      className={st.button}
      onClick={handler && handler}
      data-type={`${dataType}`}>
      {icon && !imageIcon && (
        <DynamicIcon
          size={icon.size}
          iconName={icon.iconName}
          color={icon.color}
          luminance={icon.luminance}
          style={st}
        />
      )}
      {!icon && imageIcon && (
        <ImageIcon iconSrc={imageIcon} style={st.imageIcon} />
      )}
      <span className={st.title}>{title}</span>
    </button>
  )
}

export default Button
