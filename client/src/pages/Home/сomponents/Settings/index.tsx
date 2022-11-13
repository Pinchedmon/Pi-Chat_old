import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import useDarkMode from '../../../../hooks/useDarkMode'

const Setting = () => {
  const [colorTheme, setTheme]: any = useDarkMode()
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false)

  const toggleDarkMode = () => {
    setTheme(colorTheme)
    setDarkSide(!darkSide)
  }

  return (
    <div className='h-screen'>
      <div className='mt-100px flex flex-col items-center'>
        <div className='font-bold text-xl mb-16px text-green-600 dark:text-green-50'>Сменить тему</div>
        <button onClick={toggleDarkMode}>
          {darkSide ? (
            <MoonIcon className='w-32px h-32px text-green-600' />
          ) : (
            <SunIcon className='w-32px h-32px text-green-600' />
          )}
        </button>
      </div>
    </div>
  )
}

export default Setting
