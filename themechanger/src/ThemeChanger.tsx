import React, { FC } from 'react'
import { useTheme } from './ThemeContext';

interface ThemeChangerProps {
  
}

const ThemeChanger: FC<ThemeChangerProps> = ({  }) => {
    const {toggleTheme,theme}=useTheme()
    return (
      <>
      <button onClick={()=>toggleTheme('light')} >light</button>
      <button onClick={()=>toggleTheme('dark')} >dark</button>
      </>
    )
}

export default ThemeChanger;