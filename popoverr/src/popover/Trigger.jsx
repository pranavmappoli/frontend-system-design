import { usePopoverContext } from "./PopoverContext";

const Trigger = function ({ children }) {
  const { buttonHandler } = usePopoverContext();

  return <div onClick={buttonHandler}>{children} </div>;
};

export default Trigger;
