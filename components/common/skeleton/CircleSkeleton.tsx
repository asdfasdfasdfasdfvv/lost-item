import React from 'react'

interface CircleSkeletonProps {
  className?: string
}

const CircleSkeleton: React.FC<CircleSkeletonProps> = ({ className = '' }) => {
  const baseStyle = `rounded-full bg-gray-300 animate-pulse`

  return <div className={`${baseStyle} ${className}`}></div>
}

export default CircleSkeleton
