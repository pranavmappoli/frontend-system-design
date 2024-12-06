import React, { Children, createContext, useContext, useReducer } from "react";
import ToastContainer from "./ToastContainer";

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
