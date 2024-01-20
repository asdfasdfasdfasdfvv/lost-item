import ImageIcon from 'components/common/ImageIcon'
import type { ButtonStyle } from 'types/style/common'
import tw from 'utils/twMergeObjects'

import type { ButtonProps } from '../ui/button'
import { RadixButton } from '../ui/button'
import type { IconKeys } from './DynamicIcon'
import DynamicIcon from './DynamicIcon'

export type IconType = {
  iconName: IconKeys
  size: number
  color?: string
  luminance?: number
}
type CommonButtonProps = ButtonProps & {
  title?: string
  icon?: IconType
  imageIcon?: string
  style?: ButtonStyle
  buttonType?: 'submit' | 'reset' | 'button' | undefined
}

const twButtonStyles = {
  wrapper: '',
  icon: '',
  imageIcon: '',
  title: ''
}

const Button = ({
  title,
  style,
  icon,
  imageIcon,
  buttonType = 'button',
  ...props
}: CommonButtonProps) => {
  const st = tw<ButtonStyle>(twButtonStyles, style)
  return (
    <RadixButton className={st.wrapper} type={buttonType} {...props}>
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
    </RadixButton>
  )
}

export default Button
