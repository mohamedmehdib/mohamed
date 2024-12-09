import React from 'react'
import Link from 'next/link'

export default function Fail() {
  return (
    <div>
      <Link className="text-gray-300 mt-7 ml-7 rounded-full text-2xl fixed bg-zinc-600 h-10 w-10 flex items-center justify-center" href="./">
        <i className="uil uil-arrow-left"></i>
      </Link>

      <div className="bg-gray-300 text-zinc-600 min-h-screen flex justify-center items-center p-4">
        <span className="text-center">
          <i className="text-5xl sm:text-6xl md:text-7xl uil uil-annoyed"></i>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mt-4">The payment fail</h1>
        </span>
      </div>
    </div>
  )
}
