export type InputStyle = {
  wrapper?: string
  input?: string
  label?: string
  invalidMessage?: string
}
export type ButtonStyle = {
  button?: string
  icon?: string
  imageIcon?: string
  title?: string
}

export type IconStyle = Pick<ButtonStyle, 'icon'>
