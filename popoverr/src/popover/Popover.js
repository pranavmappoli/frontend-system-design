import React, { useEffect, useRef, useState } from "react";
import Trigger from "./Trigger";
import Content from "./Content";
import { PopoverContextProvider } from "./PopoverContext";

function Popover({ children, onClose, open, position = "bottom" }) {
  const [openPop, setOpenPop] = useState(false);
  const contentRef = useRef();
  const triggerRef = useRef();

  useEffect(() => {
    setOpenPop(open);
  }, [open]);

  useEffect(() => {
    window.addEventListener("click", outsideClickHandler);
    return () => {
      window.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  const buttonHandler = () => {
    setOpenPop((prev) => !prev);
    if (onClose && openPop) {
      onClose();
    }
  };

  const outsideClickHandler = (e) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(e.target) &&
      !triggerRef.current.contains(e.target)
    ) {
      buttonHandler();
    }
  };

  return (
    <PopoverContextProvider
      value={{ openPop, buttonHandler, position, contentRef, triggerRef }}
    >
      <div className="relative bg-slate-700 ">{children}</div>
    </PopoverContextProvider>
  );
}

Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;
