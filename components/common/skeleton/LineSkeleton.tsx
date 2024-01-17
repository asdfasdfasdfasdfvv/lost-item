import React from 'react'

interface LineSkeletonProps {
  className?: string
}

const LineSkeleton: React.FC<LineSkeletonProps> = ({ className }) => {
  const baseStyle = `bg-gray-300 animate-pulse`

  return <div className={`${baseStyle} ${className} my-2`}></div>
}

export default LineSkeleton
