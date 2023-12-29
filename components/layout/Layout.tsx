import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col bg-bgGray p-6">
      <header className="text-white p-4 text-center"></header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-700 text-white p-4"></footer>
    </div>
  )
}

export default BaseLayout
