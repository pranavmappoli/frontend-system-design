import React, { useEffect, useRef, useState } from "react";
import { useToast } from "./toastContext";

const toastConfig = {
  success: {
    className: "bg-green-500",
  },
  error: {
    className: "bg-red-500",
  },
  warning: {
    className: "bg-yellow-500",
  },
};

function Toast({ id, type, message, options }) {
  const timerRef = useRef();
  const { removeToast } = useToast();
  const [timer, setTimer] = useState(3000);

  const timerPrcnt = Math.round((timer / 3000) * 100);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1);

    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!timer) {
      removeToast(id);
      clearTimeout(timerRef.current);
    }
  }, [timer]);

  return (
    <div className="flex flex-col ">
      <div
        className={`relative w-[250px] h-14  flex justify-center items-center text-white ${toastConfig[type].className}`}
      >
        {message}
        <button
          className="absolute top-0 right-0 p-1"
          onClick={() => removeToast(id)}
        >
          X
        </button>
      </div>
      <div
        style={{ width: `${timerPrcnt}%` }}
        className={`h-1 ${toastConfig[type].className}`}
      ></div>
    </div>
  );
}

export default Toast;
