
import React from 'react'

const Loader = () => {
  return (
    <div className="absolute z-[99] h-[80vh] w-screen flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Loader
