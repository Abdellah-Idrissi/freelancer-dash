"use client"

import { RxMoon } from 'react-icons/rx'
import { FiSun } from 'react-icons/fi'
import { useState } from 'react'

export default function ThemeButton() {

  const [theme,setTheme] = useState<themeType>('light')

  const toggleTheme = ()=> {

    if(theme === 'dark') {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
      setTheme('light')
    }

    else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme','dark')
      setTheme('dark')
    }

  }

  return (
    <button onClick={toggleTheme} className="iconHover">
      {theme === 'dark' ? <RxMoon className={'text-[18px] md:text-[20px]'} /> : <FiSun className={'text-[18px] md:text-[20px]'} />}
    </button>
  )
}
