import React from 'react'

interface RectangleSkeletonProps {
  width: number | string
  height: number | string
  className?: string
}

const RectangleSkeleton: React.FC<RectangleSkeletonProps> = ({
  width,
  height,
  className
}) => {
  const baseStyle = `bg-gray-300 animate-pulse`
  const sizeStyle = `w-${width} h-${height}`

  return <div className={`${baseStyle} ${sizeStyle} ${className}`}></div>
}

export default RectangleSkeleton
