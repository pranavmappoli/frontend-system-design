import React, { useContext, useState, createContext } from "react"
import classes from "./Accordian.module.css"

const AccordianContext = createContext({ open: false })

function Accordian({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <AccordianContext.Provider value={{ open, setOpen }}>
      {children}
    </AccordianContext.Provider>
  )
}

function Title({ children }) {
  const { setOpen } = useContext(AccordianContext)
  return (
    <div className={classes.title} onClick={() => setOpen((prev) => !prev)} role="button">
      {children}
    </div>
  )
}

function Content({ children }) {
  const { open } = useContext(AccordianContext)
  return (
      <div>
      {open && <div>
        {children}
      </div>}
    </ div>
      )
}
      Accordian.Title=Title
      Accordian.Content=Content

      export default Accordian