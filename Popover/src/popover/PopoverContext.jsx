import React, { createContext, useContext } from "react";

const PopOverContext = createContext();
function PopoverContextProvider({ value, children }) {
  return (
    <PopOverContext.Provider value={value}>{children}</PopOverContext.Provider>
  );
}

const usePopoverContext = () => useContext(PopOverContext);

export { PopoverContextProvider, usePopoverContext };
