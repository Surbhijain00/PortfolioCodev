
'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

const platforms = [
  {
    name: 'LeetCode'
  },
  {
    name: 'Codeforces'
  },
  {
    name: 'CodeChef'
  },
  {
    name: 'HackerRank'
  },
  {
    name: 'HackerEarth'
  },
  {
    name: 'GeeksforGeeks'
  },
]

const MarqueeBanner = () => {
  return (
    <div className='w-screen overflow-hidden my-2 sm:my-4'>
      <Marquee
      autoFill={true}
      gradient={true}
      gradientColor='#0A0A0E'
    >
      {platforms.concat(platforms).map((platform, idx) => {
        return(
          <div key={idx} className='flex items-center gap-4 mx-4 sm:mx-8 lg:mx-14'>
            <span className='text-base sm:text-xl lg:text-2xl opacity-80'>{platform.name}</span>
          </div>
        )
      })}
    </Marquee>
    </div>
  )
}

export default MarqueeBanner
