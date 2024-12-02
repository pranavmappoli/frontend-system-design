import React, { useEffect, useRef } from "react";
import { usePopoverContext } from "./PopoverContext";

const Content = function ({ children }) {
  const { openPop, position, contentRef } = usePopoverContext();

  useEffect(() => {
    if (openPop) contentRef.current.focus();
  }, [openPop]);

  const positionCss = {
    left: "left-0 -translate-x-full -translate-y-1/2",
    bottom: "left-1/2 -translate-x-1/2",
    right: "right-0 translate-x-full -translate-y-1/2",
    top: "top-0 left-1/2 -translate-y-full -translate-x-1/2",
  };
  return (
    <>
      {openPop && (
        <div
          className={`absolute p-2 text-yelllow ${positionCss[position]}`}
          ref={contentRef}
          id="popover-modal"
          role="dialog"
          aria-labelledby="popover-modal"
          tabIndex="0"
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Content;
