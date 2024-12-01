import { usePopoverContext } from "./PopoverContext";

const Content = function ({ children }) {
  const { openPop, position } = usePopoverContext();

  const positionCss = {
    left: "left-0 -translate-x-full -translate-y-1/2",
    bottom: "left-1/2 -translate-x-1/2",
    right: "right-0 translate-x-full -translate-y-1/2",
    top: "top-0 left-1/2 -translate-y-full -translate-x-1/2",
  };
  console.log(position, positionCss[position]);
  return (
    <>
      {openPop && (
        <div className={`absolute p-2 ${positionCss[position]}`}>
          {children}
        </div>
      )}
    </>
  );
};

export default Content;
