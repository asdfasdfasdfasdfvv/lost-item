import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-bgGray p-6">
      <header className="p-4 text-center text-white"></header>
      <main className="flex-1">{children}</main>
      <footer className="text-white"></footer>
    </div>
  )
}

export default BaseLayout
