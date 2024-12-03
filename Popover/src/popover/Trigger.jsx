import React from "react";
import { usePopoverContext } from "./PopoverContext";

const Trigger = function ({ children }) {
  const { buttonHandler, triggerRef, open } = usePopoverContext();

  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: buttonHandler,
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": "popover-modal",
  });
};

export default Trigger;
