import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ScrollLayout({ children }: Props) {
  return (
    <section className="overflow-y-auto scrollbar-hide">{children}</section>
  )
}
