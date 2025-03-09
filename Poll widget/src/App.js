import React, { useState } from "react";
import PollWidget from "./PollWidget";

const App = () => {
  const [polls, setPolls] = useState({ mango: 1, orange: 1, apple: 1 });
  function pollHandler(id) {
    console.log(id);
    setPolls((prev) => {
      return { ...prev, [id]: prev[id] + 1 };
    });
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen p-8 bg-blue-300">
      <PollWidget totalVotes={45} onChange={pollHandler}>
        <PollWidget.Item votes={polls["mango"]} id="mango">
          <span>mango</span>
        </PollWidget.Item>
        <PollWidget.Item votes={polls["orange"]} id="orange">
          <span>orange</span>
        </PollWidget.Item>
        <PollWidget.Item votes={polls["apple"]} id="apple">
          <span>apple</span>
        </PollWidget.Item>
      </PollWidget>
    </div>
  );
};

export default App;
