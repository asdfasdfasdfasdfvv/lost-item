import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-bgGray ">
      <main className="box-border flex w-full grow flex-col overflow-hidden px-8pxr">
        {children}
      </main>
    </div>
  )
}

export default BaseLayout
