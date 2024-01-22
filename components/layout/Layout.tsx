import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col items-center bg-bgGray">
      <header className="p-4 text-center text-white"></header>
      <main className="box-border flex w-full grow flex-col overflow-hidden px-8pxr">
        {children}
      </main>
      <footer className="text-white"></footer>
    </div>
  )
}

export default BaseLayout
