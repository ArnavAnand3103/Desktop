import React, { useState } from 'react'

export default function ThemeBtn() {
 const {themeMode,lightTheme,darkTheme}=useTheme()
 const onChangeBtn=(e)=>{
    const darkModeStatus=e.currentTarget.checked
    if(darkModeStatus){
        darkTheme()
    }else{
        lightTheme()
    }
 }

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          checked={themeMode==="dark"}
          onChange={onChangeBtn}
          className="sr-only peer"
          
        />

        <div className="w-14 h-7 bg-gray-300 rounded-full peer
          peer-checked:bg-orange-700
          peer-focus:ring-4 peer-focus:ring-orange-300
          after:content-['']
          after:absolute after:top-[2px] after:left-[2px]
          after:bg-white after:rounded-full
          after:h-6 after:w-6
          after:transition-all
          peer-checked:after:translate-x-7">
        </div>

        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </span>

      </label>
    </div>
  )
}
