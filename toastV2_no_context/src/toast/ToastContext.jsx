import React, { createContext, useContext } from "react";

const ToxtContext = createContext();

function ToastContextProvider({ children, value }) {
  return <ToxtContext.Provider value={value}>{children}</ToxtContext.Provider>;
}

export const useToast = () => {
  const context = useContext(ToxtContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }

  return context;
};

export default ToastContextProvider;
