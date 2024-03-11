import { ChangeEvent, useRef, useState } from "react";
import "./index.scss";
import InputProps from "./type";
import useClickOutside from "../../hooks/useClickOutside";

const Input = (props: InputProps) => {
  //
  const ref = useRef<HTMLInputElement>(null);
  const refContainer = useClickOutside({
    handleClick: (bool: Boolean | null) => {
      bool && setIsFocus(false);
      !bool && handleClick && handleClick();
    },
  });
  const mode = props.mode || "normal";
  const { type, placeholder, className, rounded, handleClick } = props;
  const [data, setData] = useState({
    showPassword: false,
  });
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  //
  return (
    <div ref={refContainer} className={`input__container ${className || ""}`}>
      <div onClick={() => setIsFocus(true)} className="relative">
        {type === "search" && (
          <i
            className="bx bx-search absolute top-1/2 text-base text-gray-400 left-4 transform-y-center 
          cursor-pointer"
          ></i>
        )}
        <input
          ref={ref}
          type={
            type === "password" ? (data.showPassword ? "text" : type) : type
          }
          value={value}
          onChange={(e: ChangeEvent) =>
            setValue((e.target as HTMLInputElement).value)
          }
          placeholder={mode === "normal" ? placeholder : ""}
          className={`w-full ${
            mode === "normal" || mode === "outlined"
              ? "border-solid border-gray-200 border focus:border-blue-500"
              : "border-none"
          } py-2 lead-none ${rounded ? "rounded-full" : "rounded-sm"} ${
            type === "search" ? "pl-10" : "pl-4"
          } ${type === "password" ? "pr-12" : "pr-4"}`}
          spellCheck={false}
        />
        {mode !== "normal" && type !== "search" && (
          <span
            onClick={() => {
              setIsFocus(true);
              if (ref.current) ref.current.focus();
            }}
            className={`absolute transform-y-center inline-block left-4 transition ${
              isFocus || value.length > 0
                ? "-top-0.5 text-sm bg-white py-0.5 px-1 text-blue-500 font-semibold"
                : "text-gray-500 opacity-80 pl-0.5 top-1/2"
            }`}
          >
            {placeholder || "Input"}
          </span>
        )}
        {type === "password" && (
          <i
            onClick={() =>
              setData({ ...data, showPassword: !data.showPassword })
            }
            className={`bx bx-${
              !data.showPassword ? "hide" : "show"
            } absolute top-1/2 text-xl text-gray-400 right-4 transform-y-center 
            cursor-pointer ${type}`}
          ></i>
        )}
      </div>
      {/* <p className="text-red-500 text-sm font-semibold mt-1">Field is empty.</p> */}
    </div>
  );
};

export default Input;
