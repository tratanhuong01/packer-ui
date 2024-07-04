import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import useClickOutside from "../../hooks/useClickOutsideV2";
import AutoCompleteProps from "./type";

const AutoComplete = <T,>({
  options,
  itemHandle,
  nameSearch,
  placeholder,
  defaultValue,
  disabled,
  customValue,
  customValueRender,
}: AutoCompleteProps<T>) => {
  //
  const [isFocus, setIsFocus] = useState<Boolean | null>(false);
  const [showPopup, setShowPopup] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSelect, setCurrentSelect] = useState<any>(defaultValue);
  const [value, setValue] = useState(
    defaultValue
      ? typeof defaultValue === "object"
        ? defaultValue[nameSearch || ""]
        : defaultValue
      : ""
  );
  useEffect(() => {
    setCurrentSelect(defaultValue);
    setValue(
      defaultValue
        ? typeof defaultValue === "object"
          ? defaultValue[nameSearch || ""]
          : defaultValue
        : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  const handleClick = (outside: Boolean | null) => {
    if (disabled) return;
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
  const { ref } = useClickOutside({ handleClick, status: showPopup });
  const data = (() => {
    return !value
      ? options
      : options.filter((item: T) => {
          let isHaveColumn = false;
          if (
            options.length > 0 &&
            nameSearch &&
            typeof options[0] === "object"
          ) {
            for (let key of Object.keys(options[0] as Object)) {
              if (key === nameSearch) {
                isHaveColumn = true;
                break;
              }
            }
          }
          if (!isHaveColumn) return options;
          return typeof item === "string"
            ? item.toLowerCase().indexOf(value.toLowerCase()) !== -1
            : String(
                nameSearch
                  ? customValue
                    ? customValue(item[nameSearch])
                    : item[nameSearch]
                  : ""
              )
                .toLowerCase()
                .indexOf(value.toLowerCase()) !== -1;
        });
  })();
  const CustomValueRender = customValueRender;
  //
  return (
    <div
      ref={ref}
      onClick={() => {
        setShowPopup(!showPopup);
        setIsFocus(true);
      }}
      className={`w-full p-2 my-2 border-solid ${
        isFocus ? "border border-primary" : "border border-gray-200"
      }  relative rounded-md flex items-center justify-between ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <span
        className={`absolute -transform-y-center ${
          isFocus || currentSelect
            ? "bg-white p-0.5 top-0 px-2 left-3 text-sm"
            : "text-gray-600 top-1/2 left-3 block w-full"
        } ${isFocus ? "text-primary" : "text-gray-500"}`.trim()}
        style={{ transition: "0.1s all" }}
      >
        {placeholder || "Name"}
      </span>
      <input
        type="text"
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
          className="bx bx-x absolute z-10 top-1/2 w-auto -transform-y-center right-8 text-xl text-gray-500"
        ></span>
      )}
      <span
        className={`bx bxs-chevron-${!showPopup ? "down" : "up"} text-gray-600`}
      ></span>
      {showPopup && (
        <div
          className="w-full border-solid border-gray-200 border-l border-r z-auto-complete shadow-lg
        absolute top-full left-0 mt-1 bg-white max-h-60 overflow-y-auto z-10 rounded-md"
        >
          <ul className="w-full">
            {data.map((item: T) => (
              <li
                onClick={() => {
                  setCurrentSelect(item);
                  setValue(
                    customValue
                      ? customValue(
                          item && typeof item === "object" && nameSearch
                            ? item[nameSearch]
                            : item
                        )
                      : item && typeof item === "object" && nameSearch
                      ? item[nameSearch]
                      : item
                  );
                  setShowPopup(false);
                  setIsFocus(true);
                  itemHandle && itemHandle(item);
                }}
                key={Math.random()}
                className={`p-2 border-b border-solid border-gray-200 ${
                  currentSelect === item
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                {CustomValueRender ? (
                  <CustomValueRender
                    value={
                      (item && typeof item === "object" && nameSearch
                        ? nameSearch && item[nameSearch]
                        : typeof item === "string"
                        ? item.toString()
                        : "") as string
                    }
                    object={item}
                  />
                ) : (
                  ((item && typeof item === "object" ? (
                    nameSearch && item[nameSearch]
                  ) : typeof item === "string" ? (
                    item
                  ) : (
                    <></>
                  )) as ReactNode)
                )}
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
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
