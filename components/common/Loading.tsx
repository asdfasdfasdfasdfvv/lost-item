import React from 'react'

const spinnerStyle = `
  flex justify-center items-center
  w-full h-screen
  after:content-[''] after:block after:border-4 after:border-t-4
  after:border-gray-200 after:border-t-gray-500 after:h-12 after:w-12
  after:rounded-full after:animate-spin
`

const LoadingComponent = () => <div className={spinnerStyle}></div>

export default LoadingComponent
