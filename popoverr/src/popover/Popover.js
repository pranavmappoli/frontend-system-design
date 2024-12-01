import React, { useEffect, useState } from "react";
import Trigger from "./Trigger";
import Content from "./Content";
import { PopoverContextProvider } from "./PopoverContext";

function Popover({ children, onClose, open, position = "bottom" }) {
  const [openPop, setOpenPop] = useState(false);

  const buttonHandler = () => {
    setOpenPop((prev) => !prev);
    if (onClose && openPop) {
      onClose();
    }
  };

  useEffect(() => {
    setOpenPop(open);
  }, [open]);

  return (
    <PopoverContextProvider value={{ openPop, buttonHandler, position }}>
      <div className="relative bg-slate-700 ">{children}</div>
    </PopoverContextProvider>
  );
}

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;
