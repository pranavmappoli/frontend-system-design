import React from "react";
import { ToastContainer, toast } from "./toast/ToastContainer";

function App() {
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen gap-4 p-2 bg-blue-100 ">
        <button
          className="px-2 py-4 bg-green-500"
          onClick={() => toast.success("success")}
        >
          toast success
        </button>
        <button
          className="px-2 py-4 bg-red-500"
          onClick={() => toast.error("error", { autoClose: 4000 })}
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
      <ToastContainer position="TOP_LEFT" autoClose={1000}></ToastContainer>
    </>
  );
}

export default App;
