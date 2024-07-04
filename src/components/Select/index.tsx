import Popover from "../Popover";
import { SelectProps } from "./type";

const Select = ({ options, handleSelect }: SelectProps) => {
  return (
    <Popover
      component={
        <div className="w-full px-2">
          {options.map((item) => (
            <div
              onClick={() => handleSelect(item.key, !item.checked)}
              key={item.key}
              className="flex items-center gap-3 py-3"
            >
              <span className={item.checked ? `bx bx-check` : ""}></span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      }
    >
      <div
        className="w-full flex items-center gap-3 w-auto relative border-2 border-solid border-gray-200 
        p-2.5 cursor-pointer hover:bg-gray-100 focus-within:border-red-500"
      >
        <span className="text-gray-600">Columns</span>
        <span className="bx bx-chevron-down"></span>
      </div>
    </Popover>
  );
};

export default Select;
