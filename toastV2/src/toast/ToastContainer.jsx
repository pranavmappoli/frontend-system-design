import React, { useReducer, useState } from "react";
import Toast from "./Toast";
import { initialState, reducerFunction } from "./toastReducer";
import ToastContextProvider from "./ToastContext";

const toast = {};

const positionCss = {
  TOP_RIGHT: "right",
  TOP_LEFT: "left",
};
function ToastContainer({ position = "TOP_RIGHT", autoClose }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [containerPosition, setContainerPosition] = useState(position);

  const addToast = (message, type, options) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type, options } });
  };

  const changePositionHandler = (pos) => {
    if (!Object.keys(positionCss).find((key) => key === pos)) return;
    setContainerPosition(pos);
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
  toast.success = success;
  toast.error = error;
  toast.warning = warning;

  return (
    <ToastContextProvider
      value={{ state, removeToast, autoClose, changePositionHandler }}
    >
      <div
        className={"absolute flex flex-col gap-6 p-4 top-0"}
        style={{ [positionCss[containerPosition]]: 0 }}
      >
        {state.toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContextProvider>
  );
}

export { ToastContainer, toast };
