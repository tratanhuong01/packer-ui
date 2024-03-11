import { useState } from "react";
import "./index.scss";
import PopoverProps from "./type";
import useClickOutside from "../../hooks/useClickOutside";

const Popover = (props: PopoverProps) => {
  //
  const { component, children } = props;
  const handleClick = (outside: Boolean | null) => {
    if (outside) {
      setShow(false);
    } else {
      setShow(!show);
    }
  };
  const ref = useClickOutside({ handleClick });
  const [show, setShow] = useState(false);
  //
  return (
    <div className="relative">
      <div ref={ref} className="relative w-auto inline-block">
        {children}
        {show && (
          <div className="absolute top-full left-0 mt-2 w-auto z-10 bg-white">
            {component}
          </div>
        )}
      </div>
    </div>
  );
};
export default Popover;
