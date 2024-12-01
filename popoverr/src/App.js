import React from "react";
import Popover from "./popover/Popover";

function App() {
  return (
    <div className="container flex items-center justify-center w-screen h-screen">
      <Popover
        onClose={() => console.log("popup closed")}
        open={false}
        position="bottom"
      >
        <Popover.Trigger>
          <button className="bg-red-500">click</button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="text-green-400 bg-red-500">
            {" "}
            this is popover content
            sesdretwerlktjewkrjterhwkterwkjtherwktherwktherktherkth wkerhtkerwht
            ke hwrtkh erktherkth erk
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}

export default App;
