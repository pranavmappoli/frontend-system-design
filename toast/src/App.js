import React from "react";
import { useToast } from "./toast/toastContext";

function App() {
  const toast = useToast();
  return (
    <div className="flex items-center justify-center w-screen h-screen gap-4 p-2 bg-blue-100 ">
      <button
        className="px-2 py-4 bg-green-500"
        onClick={() => toast.success("success")}
      >
        toast success
      </button>
      <button
        className="px-2 py-4 bg-red-500"
        onClick={() => toast.error("error")}
      >
        toast error
      </button>
      <button
        className="px-2 py-4 bg-yellow-400"
        onClick={() => toast.warning("warning")}
      >
        toast warning
      </button>
    </div>
  );
}

export default App;
