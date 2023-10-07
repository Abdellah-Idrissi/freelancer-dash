import Header from '@/components/main/Header'
import React from 'react'
import { secondFont } from '../layout'
import Aside from '@/components/Aside'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='lg:flex'>

      <Aside font={secondFont.className}/>

      <div className='flex-1'>
        <Header font={secondFont.className}/>
        {children}
      </div>

    </div>
  )
}
