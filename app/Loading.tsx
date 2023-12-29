// SkeletonLoader.tsx
import React from 'react'
import 'tailwindcss/tailwind.css'

export default function Loading() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-gray-300 rounded"></div>
        <div className="space-y-3">
          <div className="h-2 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}
