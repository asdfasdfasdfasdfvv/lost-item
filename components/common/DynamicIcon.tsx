import type { FC, SVGProps } from 'react'
import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as Hi12Icons from 'react-icons/hi2'
import type { IconStyle } from 'types/style/common'
import { darkenColor } from 'utils/darkenColor'
import tw from 'utils/twMergeObjects'

export type IconKeys =
  | keyof typeof FaIcons
  | keyof typeof AiIcons
  | keyof typeof Hi12Icons

interface DynamicIconProps {
  iconName: IconKeys
  color?: string
  luminance?: number
  size?: number
  style?: IconStyle
}

const iconLibraries = {
  FaIcons,
  AiIcons,
  Hi12Icons
}

const DynamicIcon: FC<DynamicIconProps> = ({
  iconName,
  color = '#80FFD1',
  luminance = 0,
  size = 24,
  style
}) => {
  let IconComponent: React.ComponentType<SVGProps<SVGSVGElement>> | null = null

  for (const library of Object.values(iconLibraries)) {
    if (Object.hasOwnProperty.call(library, iconName)) {
      IconComponent = library[
        iconName as keyof typeof library
      ] as React.ComponentType<SVGProps<SVGSVGElement>>
      break
    }
  }

  const iconColor = darkenColor(color, luminance)
  const iconSizeStyle = { width: `${size}rem`, height: `${size}rem` }
  const iconWrapperStyle = { icon: 'box-border shrink-0' }

  const st = tw<IconStyle>(iconWrapperStyle, style)
  if (IconComponent) {
    return (
      <div style={iconSizeStyle} className={st.icon}>
        <IconComponent
          className={`h-full w-full`}
          style={{ color: iconColor }}
        />
      </div>
    )
  }

  return null
}

export default DynamicIcon
