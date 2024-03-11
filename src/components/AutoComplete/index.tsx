import { ChangeEvent, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const AutoComplete = (props: {
  options: any[];
  itemHandle?: (item: any) => void;
  nameSearch?: null | string;
}) => {
  //
  const [isFocus, setIsFocus] = useState<Boolean | null>();
  const [showPopup, setShowPopup] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSelect, setCurrentSelect] = useState("");
  const [value, setValue] = useState("");
  const handleClick = (outside: Boolean | null) => {
    if (currentSelect) {
      setIsFocus(true);
    } else {
      setIsFocus(!outside);
    }
    setShowPopup(!showPopup);
    if (outside) {
      setShowPopup(false);
      setIsFocus(false);
    }
  };
  const { options, itemHandle, nameSearch } = props;
  const ref = useClickOutside({ handleClick });
  const data = (() => {
    return !value
      ? options
      : options.filter((item) => {
          let isHaveColumn = false;
          if (
            options.length > 0 &&
            nameSearch &&
            typeof options[0] === "object"
          ) {
            for (let key of Object.keys(options[0])) {
              if (key === nameSearch) {
                isHaveColumn = true;
                break;
              }
            }
            if (!isHaveColumn) return options;
            return (
              item[nameSearch].toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
          }

          return item.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
  })();
  //
  return (
    <div
      ref={ref}
      className={`w-72 p-3 border-solid ${
        isFocus ? "border-2 border-blue-500" : "border border-gray-200"
      } cursor-pointer relative
      rounded-sm flex items-center justify-between`}
    >
      <span
        className={`absolute transform-y-center ${
          isFocus || currentSelect
            ? "bg-white p-1 top-0 px-2 left-3 text-sm"
            : "text-gray-600 top-1/2 left-3 block w-full"
        } ${isFocus ? "text-blue-500" : "text-gray-500"}`}
        style={{ transition: "0.1s all" }}
      >
        Name
      </span>
      <input
        type="text"
        onClick={() => setShowPopup(false)}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
        className="text-gray-600"
      />
      {(currentSelect || value) && (
        <span
          onClick={() => {
            setCurrentSelect("");
            setValue("");
            setShowPopup(false);
          }}
          className="bx bx-x absolute z-10 top-1/2 transform-y-center right-8 text-xl text-gray-500"
        ></span>
      )}
      <span
        className={`bx bxs-chevron-${!showPopup ? "down" : "up"} text-gray-600`}
      ></span>
      {showPopup && (
        <ul
          className="w-full border-solid border-gray-200 border-l border-r
         absolute top-full left-0 mt-1 bg-white max-h-60 overflow-y-scroll"
        >
          {data.map((item) => (
            <li
              onClick={() => {
                setCurrentSelect(item);
                setValue(
                  typeof item === "object" && nameSearch
                    ? item[nameSearch]
                    : item
                );
                setShowPopup(false);
                setIsFocus(true);
                itemHandle && itemHandle(item);
              }}
              key={typeof item === "object" ? item.id : item}
              className={`p-2 border-b border-solid border-gray-200 ${
                currentSelect === item ? "" : "hover:"
              }bg-gray-100`}
            >
              {typeof item === "object" ? item[nameSearch || "name"] : item}
            </li>
          ))}
          {data.length === 0 && (
            <li
              className={`p-2 border-b border-solid border-gray-30 bg-gray-100`}
            >
              No options
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
