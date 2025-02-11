
import React,{ Children, createContext, useContext, useEffect, useState } from "react";

const LIGHT = "light"
const DARK = "dark"

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DARK)

  useEffect(()=>{
    const savedTheme=localStorage.getItem('theme')
    if(savedTheme) setTheme(savedTheme)
    else{
      const sysPref=window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT
      setTheme(sysPref)
    }
  },[])

  useEffect(() => {
    if (theme === DARK) {
      document.querySelector('body').classList.add(DARK)
    }
    else {
      document.querySelector('body').classList.remove(DARK)
    }
    localStorage.setItem('theme',theme)

  }, [theme])

  function toggleTheme(theme: string) {
    setTheme(theme)
  }

  return (<ThemeContext.Provider value={{ toggleTheme,theme }}>
    {children}
  </ThemeContext.Provider>)
}

const useTheme = () => useContext(ThemeContext)
export { useTheme, ThemeProvider }
