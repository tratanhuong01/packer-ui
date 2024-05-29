import { useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import PopoverProps from "./type";

const Popover = (props: PopoverProps) => {
  //
  const [show, setShow] = useState(false);
  const { component, children } = props;
  const handleClick = (outside: Boolean | null) => {
    if (outside) {
      setShow(false);
    } else {
      setShow(!show);
    }
  };
  const { ref, refPop } = useClickOutside({ handleClick, status: show });
  //
  return (
    <div className="relative">
      <div ref={ref} className="relative">
        {children}
        {show && (
          <div
            ref={refPop}
            className="absolute top-full left-0 mt-1 w-full z-10 bg-white shadow-xl border border-solid 
            border-gray-200"
          >
            {component}
          </div>
        )}
      </div>
    </div>
  );
};
export default Popover;
