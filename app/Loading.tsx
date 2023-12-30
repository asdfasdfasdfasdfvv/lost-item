// SkeletonLoader.tsx
import 'tailwindcss/tailwind.css'

import React from 'react'

export default function Loading() {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 rounded bg-gray-300"></div>
        <div className="space-y-3">
          <div className="h-2 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
