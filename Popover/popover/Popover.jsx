import React, { createContext, useContext, useState } from "react";

const PopOverContext = createContext();

function Popover({ children, onClose, open, position }) {
  const [openPop, setOpenPop] = useState(open);

  const buttonHandler = () => {
    setOpenPop((prev) => !prev);
  };
  console.log(openPop);
  return (
    <PopOverContext.Provider value={{ openPop, buttonHandler }}>
      <div className="relative bg-slate-700">{children}</div>
    </PopOverContext.Provider>
  );
}

Popover.Trigger = ({ children }) => {
  const { buttonHandler } = useContext(PopOverContext);

  return <div onClick={buttonHandler}>{children} </div>;
};

Popover.Content = ({ children }) => {
  const { openPop } = useContext(PopOverContext);

  return (
    <>
      {openPop && (
        <div className="absolute right-0 h-10 -translate-x-1/2 bg-green-500 w-44">
          {children}
        </div>
      )}
    </>
  );
};

Popover.Content.displayName = "Popover.Content";
Popover.Trigger.displayName = "Popover.Trigger";
export default Popover;
