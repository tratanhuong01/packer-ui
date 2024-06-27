import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutsideV2";
import PopoverProps from "./type";

const Popover = (props: PopoverProps) => {
  //
  const [show, setShow] = useState(false);
  const { component, children, className, position } = props;
  const handleClick = (outside: Boolean | null) => {
    setShow(!outside);
  };
  const { ref } = useClickOutside({
    handleClick,
    status: show,
  });
  //
  return (
    <div ref={ref} className="relative">
      <div onClick={() => setShow(!show)}>{children}</div>
      {show && (
        <div
          // onClick={() => setShow(false)}
          className={`absolute top-full ${
            position || "left-0 mt-0"
          } z-5 bg-white rounded-lg border border-solid overflow-hidden shadow-lg 
            border-gray-200 ${className}`.trim()}
          style={{ zIndex: 3 }}
        >
          {component}
        </div>
      )}
    </div>
  );
};
export default Popover;
