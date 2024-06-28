import useClickOutside from "../../hooks/useClickOutsideV3";
import PopoverProps from "./type";

const Popover = (props: PopoverProps) => {
  //
  const { component, children, className, position } = props;
  const { isOpen, ref, refPopup, setIsOpen } = useClickOutside();
  //
  return (
    <div ref={ref} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && (
        <div
          ref={refPopup}
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
