import React from "react";
import Popover from "../popover/Popover";

function App() {
  return (
    <div className="container flex items-center justify-center w-screen h-screen">
      <Popover>
        <Popover.Trigger>
          <button className="bg-red-500">click</button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="text-green-400 "> this is popover content</div>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default App;
