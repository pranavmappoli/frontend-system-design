import React from "react";
import { ThemeProvider } from "./ThemeContext";
import ThemeChanger from "./ThemeChanger";

function App() {
  return (
    <ThemeProvider>
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100 ">
      <ThemeChanger/>
    </div>
    </ThemeProvider>
  );
}

export default App;
