import React, { useReducer } from "react";
import Toast from "./Toast";
import ToastContextProvider from "./toastContext";
import { initialState, reducerFunction } from "./toastReducer";

function ToastContainer({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  const addToast = (message, type, options) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type, options } });
  };

  const removeToast = (id) => {
    dispatch({ type: "REMOVE_TOAST", payload: { id } });
  };

  function success(message, option) {
    addToast(message, "success", option);
  }
  function error(message, option) {
    addToast(message, "error", option);
  }
  function warning(message, option) {
    addToast(message, "warning", option);
  }

  return (
    <ToastContextProvider
      value={{ state, success, error, warning, removeToast }}
    >
      <div className="absolute top-0 right-0 flex flex-col gap-6 p-4">
        {state.toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
      {children}
    </ToastContextProvider>
  );
}

export default ToastContainer;
