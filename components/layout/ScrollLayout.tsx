import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ScrollLayout({ children }: Props) {
  return (
    <section className="flex w-full flex-col overflow-y-auto ">
      {children}
    </section>
  )
}
